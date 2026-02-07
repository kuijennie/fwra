import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all reminders for a session
export const getBySession = query({
  args: { sessionId: v.string() },
  handler: async (ctx, { sessionId }) => {
    return await ctx.db
      .query("reminders")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .order("asc")
      .collect();
  },
});

// Get pending reminders (not completed)
export const getPending = query({
  args: { sessionId: v.string() },
  handler: async (ctx, { sessionId }) => {
    const reminders = await ctx.db
      .query("reminders")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .collect();

    return reminders
      .filter((r) => !r.isCompleted)
      .sort((a, b) => a.dueDate - b.dueDate);
  },
});

// Get upcoming reminders (due in next 7 days)
export const getUpcoming = query({
  args: { sessionId: v.string() },
  handler: async (ctx, { sessionId }) => {
    const now = Date.now();
    const weekFromNow = now + 7 * 24 * 60 * 60 * 1000;

    const reminders = await ctx.db
      .query("reminders")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .collect();

    return reminders
      .filter((r) => !r.isCompleted && r.dueDate >= now && r.dueDate <= weekFromNow)
      .sort((a, b) => a.dueDate - b.dueDate);
  },
});

// Get overdue reminders
export const getOverdue = query({
  args: { sessionId: v.string() },
  handler: async (ctx, { sessionId }) => {
    const now = Date.now();

    const reminders = await ctx.db
      .query("reminders")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .collect();

    return reminders
      .filter((r) => !r.isCompleted && r.dueDate < now)
      .sort((a, b) => a.dueDate - b.dueDate);
  },
});

// Create a new reminder
export const create = mutation({
  args: {
    sessionId: v.string(),
    userId: v.optional(v.id("users")),
    wasteEntryId: v.optional(v.id("wasteEntries")),
    recommendationId: v.optional(v.id("recommendations")),
    title: v.object({
      en: v.string(),
      sw: v.string(),
    }),
    description: v.optional(
      v.object({
        en: v.string(),
        sw: v.string(),
      })
    ),
    taskType: v.string(),
    dueDate: v.number(),
    repeatInterval: v.optional(v.string()),
    repeatDays: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const reminderId = await ctx.db.insert("reminders", {
      ...args,
      isCompleted: false,
      notificationSent: false,
      createdAt: Date.now(),
    });

    return reminderId;
  },
});

// Mark reminder as complete
export const markComplete = mutation({
  args: { id: v.id("reminders") },
  handler: async (ctx, { id }) => {
    const reminder = await ctx.db.get(id);
    if (!reminder) throw new Error("Reminder not found");

    await ctx.db.patch(id, {
      isCompleted: true,
      completedAt: Date.now(),
    });

    // If this is a repeating reminder, create the next occurrence
    if (reminder.repeatInterval && reminder.repeatInterval !== "none") {
      let nextDueDate = reminder.dueDate;

      switch (reminder.repeatInterval) {
        case "daily":
          nextDueDate += 24 * 60 * 60 * 1000;
          break;
        case "weekly":
          nextDueDate += 7 * 24 * 60 * 60 * 1000;
          break;
        case "custom":
          if (reminder.repeatDays) {
            nextDueDate += reminder.repeatDays * 24 * 60 * 60 * 1000;
          }
          break;
      }

      // Create next reminder
      await ctx.db.insert("reminders", {
        sessionId: reminder.sessionId,
        userId: reminder.userId,
        wasteEntryId: reminder.wasteEntryId,
        recommendationId: reminder.recommendationId,
        title: reminder.title,
        description: reminder.description,
        taskType: reminder.taskType,
        dueDate: nextDueDate,
        repeatInterval: reminder.repeatInterval,
        repeatDays: reminder.repeatDays,
        isCompleted: false,
        notificationSent: false,
        createdAt: Date.now(),
      });
    }

    return { success: true };
  },
});

// Update a reminder
export const update = mutation({
  args: {
    id: v.id("reminders"),
    title: v.optional(
      v.object({
        en: v.string(),
        sw: v.string(),
      })
    ),
    description: v.optional(
      v.object({
        en: v.string(),
        sw: v.string(),
      })
    ),
    taskType: v.optional(v.string()),
    dueDate: v.optional(v.number()),
    repeatInterval: v.optional(v.string()),
    repeatDays: v.optional(v.number()),
  },
  handler: async (ctx, { id, ...updates }) => {
    const reminder = await ctx.db.get(id);
    if (!reminder) throw new Error("Reminder not found");

    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined)
    );

    await ctx.db.patch(id, filteredUpdates);
    return { success: true };
  },
});

// Delete a reminder
export const remove = mutation({
  args: { id: v.id("reminders") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
    return { success: true };
  },
});

// Get reminder stats
export const getStats = query({
  args: { sessionId: v.string() },
  handler: async (ctx, { sessionId }) => {
    const reminders = await ctx.db
      .query("reminders")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .collect();

    const now = Date.now();
    const pending = reminders.filter((r) => !r.isCompleted);
    const completed = reminders.filter((r) => r.isCompleted);
    const overdue = pending.filter((r) => r.dueDate < now);

    return {
      total: reminders.length,
      pending: pending.length,
      completed: completed.length,
      overdue: overdue.length,
    };
  },
});

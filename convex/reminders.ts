import { query, mutation, internalQuery, internalMutation } from "./_generated/server";
import { v } from "convex/values";

// Fetch all reminders for a session, ordered by due date ascending
// so the soonest tasks appear first
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

// Only returns reminders that haven't been completed yet, sorted by due date
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

// Returns reminders due within the next 7 days — used for the "upcoming" section
// on the reminders page
export const getUpcoming = query({
  args: { sessionId: v.string() },
  handler: async (ctx, { sessionId }) => {
    const now = Date.now();
    const weekFromNow = now + 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

    const reminders = await ctx.db
      .query("reminders")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .collect();

    return reminders
      .filter((r) => !r.isCompleted && r.dueDate >= now && r.dueDate <= weekFromNow)
      .sort((a, b) => a.dueDate - b.dueDate);
  },
});

// Returns reminders where the due date has already passed and they're not done yet
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

// Creates a new reminder. Both sessionId and userId are stored so the reminder
// works for anonymous users and also gets linked to an account if they sign in later.
// I store the title in both English and Swahili to support the app's two languages.
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
    taskType: v.string(), // 'turn_compost', 'check_biogas', 'harvest', 'water', 'custom'
    dueDate: v.number(),  // Unix timestamp in milliseconds
    repeatInterval: v.optional(v.string()), // 'daily', 'weekly', 'custom'
    repeatDays: v.optional(v.number()),     // only used when repeatInterval is 'custom'
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

// Marks a reminder as done. If it's a repeating reminder, I automatically
// create the next occurrence so the farmer doesn't have to set it up again.
export const markComplete = mutation({
  args: { id: v.id("reminders") },
  handler: async (ctx, { id }) => {
    const reminder = await ctx.db.get(id);
    if (!reminder) throw new Error("Reminder not found");

    await ctx.db.patch(id, {
      isCompleted: true,
      completedAt: Date.now(),
    });

    // Auto-create the next reminder if this one repeats
    if (reminder.repeatInterval && reminder.repeatInterval !== "none") {
      let nextDueDate = reminder.dueDate;

      // Calculate when the next reminder should be due
      switch (reminder.repeatInterval) {
        case "daily":
          nextDueDate += 24 * 60 * 60 * 1000; // +1 day
          break;
        case "weekly":
          nextDueDate += 7 * 24 * 60 * 60 * 1000; // +7 days
          break;
        case "custom":
          // The farmer chose a specific number of days between reminders
          if (reminder.repeatDays) {
            nextDueDate += reminder.repeatDays * 24 * 60 * 60 * 1000;
          }
          break;
      }

      // Insert the next occurrence with the same settings but a new due date
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

// Updates specific fields on a reminder. I only patch the fields that were
// actually provided — undefined values are filtered out so I don't accidentally
// overwrite existing data with null.
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

    // Strip out any undefined values before patching
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined)
    );

    await ctx.db.patch(id, filteredUpdates);
    return { success: true };
  },
});

// Permanently deletes a reminder
export const remove = mutation({
  args: { id: v.id("reminders") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
    return { success: true };
  },
});

// Summary counts used on the reminders dashboard header
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

// Internal query called by the cron job every hour.
// Finds all reminders that are due and haven't had an email sent yet,
// then pairs each one with the user's email and preferred language.
// Only reminders with a linked userId are included — anonymous reminders
// have no email address to send to.
export const getDueForEmail = internalQuery({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    // Use the by_due_date index to efficiently find reminders that are already due
    const reminders = await ctx.db
      .query("reminders")
      .withIndex("by_due_date", (q) => q.lte("dueDate", now))
      .collect();

    // Keep only uncompleted reminders where the email hasn't been sent yet
    const due = reminders.filter((r) => !r.isCompleted && !r.notificationSent);

    const results: { reminder: typeof due[number]; email: string; lang: "en" | "sw" }[] = [];

    for (const reminder of due) {
      if (!reminder.userId) continue; // skip anonymous reminders — no email to send to
      const user = await ctx.db.get(reminder.userId);
      if (!user?.email) continue;
      results.push({
        reminder,
        email: user.email,
        lang: user.preferredLanguage === "sw" ? "sw" : "en",
      });
    }

    return results;
  },
});

// Internal mutation called after each email is sent successfully.
// Marking notificationSent = true prevents the cron job from sending
// duplicate emails on the next hourly run.
export const markNotificationSent = internalMutation({
  args: { id: v.id("reminders") },
  handler: async (ctx, { id }) => {
    await ctx.db.patch(id, { notificationSent: true });
  },
});

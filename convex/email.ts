import { action, internalAction } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

function tutorialHtml(tutorial: {
  title: { en: string; sw: string };
  description: { en: string; sw: string };
  difficulty: string;
  duration: string;
  steps: Array<{
    stepNumber: number;
    title: { en: string; sw: string };
    content: { en: string; sw: string };
  }>;
}, lang: "en" | "sw") {
  const stepsHtml = tutorial.steps
    .map(
      (s) => `<li style="margin-bottom:12px;">
        <strong style="color:#1f2937;">${s.title[lang]}</strong><br/>
        <span style="color:#4b5563;">${s.content[lang]}</span>
      </li>`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
    <div style="background:#06402B;padding:28px 32px;">
      <p style="margin:0;color:rgba(255,255,255,0.7);font-size:12px;text-transform:uppercase;letter-spacing:1px;">Farm Waste Recycling Advisor</p>
      <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;">New Tutorial</h1>
    </div>
    <div style="padding:32px;">
      <h2 style="margin:0 0 8px;color:#06402B;font-size:20px;">${tutorial.title[lang]}</h2>
      <p style="margin:0 0 20px;color:#4b5563;line-height:1.6;">${tutorial.description[lang]}</p>
      <div style="background:#f0fdf4;border-radius:8px;padding:12px 16px;margin-bottom:24px;display:inline-flex;gap:16px;">
        <span style="color:#166534;font-size:13px;"><strong>Difficulty:</strong> ${tutorial.difficulty}</span>
        <span style="color:#166534;font-size:13px;"><strong>Duration:</strong> ${tutorial.duration}</span>
      </div>
      <h3 style="color:#1f2937;font-size:16px;margin:0 0 12px;">Steps</h3>
      <ol style="padding-left:20px;margin:0;">${stepsHtml}</ol>
    </div>
    <div style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">You received this because you are registered on FWRA &mdash; fwra.co.ke</p>
    </div>
  </div>
</body>
</html>`;
}

export const sendTutorialEmail = action({
  args: {
    tutorialId: v.id("tutorials"),
  },
  handler: async (ctx, { tutorialId }) => {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured in Convex environment variables");

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const [tutorial, users] = await Promise.all([
      ctx.runQuery(internal.tutorials.getByIdInternal, { id: tutorialId }),
      ctx.runQuery(internal.users.getUsersWithEmails),
    ]);

    if (!tutorial) throw new Error("Tutorial not found");

    let sent = 0;
    for (const user of users) {
      if (!user.email) continue;
      const lang: "en" | "sw" = user.preferredLanguage === "sw" ? "sw" : "en";
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "FWRA <noreply@fwra.co.ke>",
          to: user.email,
          subject: `New Tutorial: ${tutorial.title[lang]}`,
          html: tutorialHtml(tutorial, lang),
        }),
      });
      if (res.ok) sent++;
    }

    return { sent };
  },
});

function reminderHtml(reminder: {
  title: { en: string; sw: string };
  description?: { en: string; sw: string } | null;
  taskType: string;
  dueDate: number;
}, lang: "en" | "sw") {
  const title = reminder.title[lang];
  const description = reminder.description?.[lang] ?? "";
  const due = new Date(reminder.dueDate).toLocaleString("en-KE", {
    dateStyle: "full",
    timeStyle: "short",
  });
  const taskLabel = reminder.taskType.replace(/_/g, " ");

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
    <div style="background:#06402B;padding:28px 32px;">
      <p style="margin:0;color:rgba(255,255,255,0.7);font-size:12px;text-transform:uppercase;letter-spacing:1px;">Farm Waste Recycling Advisor</p>
      <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;">Task Reminder</h1>
    </div>
    <div style="padding:32px;">
      <span style="background:#dcfce7;color:#166534;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:600;text-transform:capitalize;">${taskLabel}</span>
      <h2 style="margin:16px 0 8px;color:#06402B;font-size:20px;">${title}</h2>
      ${description ? `<p style="margin:0 0 20px;color:#4b5563;line-height:1.6;">${description}</p>` : ""}
      <div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:16px 20px;border-radius:0 8px 8px 0;margin-top:16px;">
        <p style="margin:0;font-weight:700;color:#166534;font-size:13px;">Due</p>
        <p style="margin:4px 0 0;color:#166534;">${due}</p>
      </div>
    </div>
    <div style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">You received this because you set a reminder on FWRA &mdash; fwra.co.ke</p>
    </div>
  </div>
</body>
</html>`;
}

export const sendDueReminderEmails = internalAction({
  args: {},
  handler: async (ctx) => {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) return;

    const dueReminders = await ctx.runQuery(internal.reminders.getDueForEmail);

    let sent = 0;
    for (const { reminder, email, lang } of dueReminders) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "FWRA <noreply@fwra.co.ke>",
          to: email,
          subject: `Reminder: ${reminder.title[lang]}`,
          html: reminderHtml(reminder, lang),
        }),
      });
      if (res.ok) {
        await ctx.runMutation(internal.reminders.markNotificationSent, { id: reminder._id });
        sent++;
      }
    }

    return { sent };
  },
});

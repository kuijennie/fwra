import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.hourly(
  "send due reminder emails",
  { minuteUTC: 0 },
  internal.email.sendDueReminderEmails
);

export default crons;

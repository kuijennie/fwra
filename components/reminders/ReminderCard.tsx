"use client";

import { useTranslations, useLocale } from "next-intl";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, Badge, Button } from "@/components/ui";
import { Check, Clock, Trash as Trash2, ArrowClockwise as RefreshCw, WarningCircle as AlertCircle, ArrowsCounterClockwise, Fire, Grains, Drop, FileText, type Icon } from "@phosphor-icons/react";
import { formatDistanceToNow, format, isPast, isToday } from "date-fns";
import type { Doc } from "@/convex/_generated/dataModel";

interface ReminderCardProps {
  reminder: Doc<"reminders">;
}

const taskTypeIcons: Record<string, Icon> = {
  turn_compost: ArrowsCounterClockwise,
  check_biogas: Fire,
  harvest:      Grains,
  water:        Drop,
  custom:       FileText,
};

export function ReminderCard({ reminder }: ReminderCardProps) {
  const t = useTranslations();
  const locale = useLocale();
  const markComplete = useMutation(api.reminders.markComplete);
  const removeReminder = useMutation(api.reminders.remove);

  const title = locale === "sw" ? reminder.title.sw : reminder.title.en;
  const description = reminder.description
    ? locale === "sw"
      ? reminder.description.sw
      : reminder.description.en
    : null;

  const dueDate = new Date(reminder.dueDate);
  const isOverdue = isPast(dueDate) && !reminder.isCompleted;
  const isDueToday = isToday(dueDate);

  const handleComplete = async () => {
    await markComplete({ id: reminder._id });
  };

  const handleDelete = async () => {
    await removeReminder({ id: reminder._id });
  };

  const getStatusBadge = () => {
    if (reminder.isCompleted) {
      return <Badge variant="success" size="sm">{t("reminders.completed")}</Badge>;
    }
    if (isOverdue) {
      return <Badge variant="danger" size="sm">{t("reminders.overdue")}</Badge>;
    }
    if (isDueToday) {
      return <Badge variant="warning" size="sm">{t("reminders.dueToday")}</Badge>;
    }
    return <Badge variant="info" size="sm">{t("reminders.pending")}</Badge>;
  };

  const getRepeatLabel = () => {
    if (!reminder.repeatInterval || reminder.repeatInterval === "none") return null;

    switch (reminder.repeatInterval) {
      case "daily":
        return t("reminders.daily");
      case "weekly":
        return t("reminders.weekly");
      case "custom":
        return `${t("reminders.every")} ${reminder.repeatDays} ${t("reminders.days")}`;
      default:
        return null;
    }
  };

  return (
    <Card className={`p-4 ${isOverdue ? "border-red-300 dark:border-red-800" : ""}`}>
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
          style={{ background: "var(--brand-100)", color: "var(--brand)" }}
        >
          {(() => { const TaskIcon = taskTypeIcons[reminder.taskType] ?? FileText; return <TaskIcon weight="duotone" className="h-5 w-5" />; })()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-medium ${reminder.isCompleted ? "text-gray-500 line-through" : "text-gray-900 dark:text-white"}`}>
              {title}
            </h3>
            {getStatusBadge()}
          </div>

          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
              {description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Clock weight="duotone" className="h-4 w-4" />
              {isOverdue ? (
                <span className="text-red-600 dark:text-red-400">
                  {formatDistanceToNow(dueDate, { addSuffix: true })}
                </span>
              ) : (
                format(dueDate, "MMM d, yyyy h:mm a")
              )}
            </span>

            {getRepeatLabel() && (
              <span className="flex items-center gap-1">
                <RefreshCw weight="duotone" className="h-3 w-3" />
                {getRepeatLabel()}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {!reminder.isCompleted && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleComplete}
              className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
            >
              <Check weight="bold" className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash2 weight="duotone" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

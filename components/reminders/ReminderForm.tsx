"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, Button, Input, Select } from "@/components/ui";
import { Plus, X } from "lucide-react";

interface ReminderFormProps {
  sessionId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const taskTypes = [
  { value: "turn_compost", labelKey: "reminders.turnCompost", icon: "🔄" },
  { value: "check_biogas", labelKey: "reminders.checkBiogas", icon: "🔥" },
  { value: "harvest", labelKey: "reminders.harvest", icon: "🌾" },
  { value: "water", labelKey: "reminders.waterPile", icon: "💧" },
  { value: "custom", labelKey: "reminders.custom", icon: "📝" },
];

const repeatOptions = [
  { value: "none", labelKey: "reminders.noRepeat" },
  { value: "daily", labelKey: "reminders.daily" },
  { value: "weekly", labelKey: "reminders.weekly" },
  { value: "custom", labelKey: "reminders.customInterval" },
];

export function ReminderForm({ sessionId, onSuccess, onCancel }: ReminderFormProps) {
  const t = useTranslations();
  const locale = useLocale();
  const createReminder = useMutation(api.reminders.create);

  const [taskType, setTaskType] = useState("turn_compost");
  const [customTitle, setCustomTitle] = useState("");
  const [customDescription, setCustomDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("09:00");
  const [repeatInterval, setRepeatInterval] = useState("none");
  const [repeatDays, setRepeatDays] = useState("7");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getDefaultTitle = (type: string) => {
    const titles: Record<string, { en: string; sw: string }> = {
      turn_compost: {
        en: "Turn the compost pile",
        sw: "Geuza rundo la mboji",
      },
      check_biogas: {
        en: "Check biogas digester",
        sw: "Angalia mtambo wa biogesi",
      },
      harvest: {
        en: "Harvest compost",
        sw: "Vuna mboji",
      },
      water: {
        en: "Water the compost pile",
        sw: "Mwagilia rundo la mboji",
      },
      custom: {
        en: customTitle || "Custom task",
        sw: customTitle || "Kazi maalum",
      },
    };
    return titles[type] || titles.custom;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dueDate) return;

    setIsSubmitting(true);

    try {
      const dueDatetime = new Date(`${dueDate}T${dueTime}`).getTime();

      await createReminder({
        sessionId,
        title: getDefaultTitle(taskType),
        description: customDescription
          ? { en: customDescription, sw: customDescription }
          : undefined,
        taskType,
        dueDate: dueDatetime,
        repeatInterval: repeatInterval !== "none" ? repeatInterval : undefined,
        repeatDays: repeatInterval === "custom" ? parseInt(repeatDays) : undefined,
      });

      // Reset form
      setTaskType("turn_compost");
      setCustomTitle("");
      setCustomDescription("");
      setDueDate("");
      setDueTime("09:00");
      setRepeatInterval("none");
      setRepeatDays("7");

      onSuccess?.();
    } catch (error) {
      console.error("Failed to create reminder:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Set default date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {t("reminders.addReminder")}
          </h3>
          {onCancel && (
            <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Task Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("reminders.taskType")}
          </label>
          <div className="grid grid-cols-5 gap-2">
            {taskTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setTaskType(type.value)}
                className={`flex flex-col items-center p-3 rounded-lg border transition-colors ${
                  taskType === type.value
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <span className="text-2xl mb-1">{type.icon}</span>
                <span className="text-xs text-center text-gray-600 dark:text-gray-400 line-clamp-1">
                  {t(type.labelKey).split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Title (only for custom task type) */}
        {taskType === "custom" && (
          <Input
            label={t("reminders.customTitle")}
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            placeholder={t("reminders.customTitlePlaceholder")}
            required
          />
        )}

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            {t("reminders.description")} ({t("common.optional")})
          </label>
          <textarea
            value={customDescription}
            onChange={(e) => setCustomDescription(e.target.value)}
            placeholder={t("reminders.descriptionPlaceholder")}
            rows={2}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Due Date & Time */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              {t("reminders.dueDate")}
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={minDate}
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              {t("reminders.time")}
            </label>
            <input
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Repeat Interval */}
        <Select
          label={t("reminders.repeat")}
          options={repeatOptions.map((opt) => ({
            value: opt.value,
            label: t(opt.labelKey),
          }))}
          value={repeatInterval}
          onChange={(e) => setRepeatInterval(e.target.value)}
        />

        {/* Custom Repeat Days */}
        {repeatInterval === "custom" && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t("reminders.every")}
            </span>
            <input
              type="number"
              value={repeatDays}
              onChange={(e) => setRepeatDays(e.target.value)}
              min="1"
              max="365"
              className="w-20 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t("reminders.days")}
            </span>
          </div>
        )}

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isSubmitting || !dueDate}>
          <Plus className="h-4 w-4" />
          {isSubmitting ? t("common.loading") : t("reminders.addReminder")}
        </Button>
      </form>
    </Card>
  );
}

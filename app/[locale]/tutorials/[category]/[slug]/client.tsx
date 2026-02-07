"use client";

import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { StepViewer } from "@/components/tutorials";
import { Link } from "@/lib/i18n/navigation";
import { Badge, Button } from "@/components/ui";
import { ChevronLeft, Clock, BookOpen, Eye, Bell, Loader2 } from "lucide-react";

interface TutorialDetailClientProps {
  slug: string;
}

const categoryIcons: Record<string, string> = {
  composting: "🌱",
  biogas: "🔥",
  mulching: "🍂",
  animal_feed: "🐄",
  vermicompost: "🪱",
};

export function TutorialDetailClient({ slug }: TutorialDetailClientProps) {
  const t = useTranslations();
  const locale = useLocale();

  const tutorial = useQuery(api.tutorials.getBySlug, { slug });
  const incrementView = useMutation(api.tutorials.incrementViewCount);

  // Increment view count on mount
  useEffect(() => {
    if (tutorial?._id) {
      incrementView({ id: tutorial._id });
    }
  }, [tutorial?._id, incrementView]);

  if (tutorial === undefined) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
        <div className="mx-auto max-w-2xl flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </div>
      </main>
    );
  }

  if (tutorial === null) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Tutorial not found
          </h1>
          <Link href="/tutorials">
            <Button>{t("common.back")}</Button>
          </Link>
        </div>
      </main>
    );
  }

  const localizedTitle = locale === "sw" ? tutorial.title.sw : tutorial.title.en;
  const localizedDescription =
    locale === "sw" ? tutorial.description.sw : tutorial.description.en;

  const difficultyColors = {
    beginner: "success",
    intermediate: "warning",
    advanced: "danger",
  } as const;

  const handleComplete = () => {
    // Could show a celebration or offer to set reminders
    console.log("Tutorial completed!");
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        {/* Back Link */}
        <Link
          href={`/tutorials/${tutorial.category}`}
          className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          {t("common.back")}
        </Link>

        {/* Header */}
        <div className="mb-8">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{categoryIcons[tutorial.category] || "📚"}</span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {t(`tutorials.${tutorial.category === "animal_feed" ? "animalFeed" : tutorial.category}`)}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            {localizedTitle}
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {localizedDescription}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant={difficultyColors[tutorial.difficulty as keyof typeof difficultyColors]}
              size="sm"
            >
              {t(`recommendations.${tutorial.difficulty}`)}
            </Badge>

            <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="h-4 w-4" />
              {tutorial.duration}
            </span>

            <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <BookOpen className="h-4 w-4" />
              {tutorial.steps.length} {t("tutorials.steps")}
            </span>

            <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <Eye className="h-4 w-4" />
              {tutorial.viewCount} views
            </span>
          </div>
        </div>

        {/* Video (if available) */}
        {tutorial.videoUrl && (
          <div className="mb-8">
            <Button variant="outline" className="w-full">
              {t("tutorials.watchVideo")}
            </Button>
          </div>
        )}

        {/* Step Viewer */}
        <StepViewer steps={tutorial.steps} onComplete={handleComplete} />

        {/* Set Reminder CTA */}
        <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-center">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Ready to start?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Set reminders to stay on track with your recycling tasks.
          </p>
          <Link href="/reminders">
            <Button>
              <Bell className="h-4 w-4" />
              {t("recommendations.setReminder")}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

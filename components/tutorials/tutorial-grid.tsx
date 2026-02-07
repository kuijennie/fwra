"use client";

import { useTranslations } from "next-intl";
import { TutorialCard } from "./tutorial-card";
import { BookOpen } from "lucide-react";

interface Tutorial {
  _id: string;
  slug: string;
  title: { en: string; sw: string };
  description: { en: string; sw: string };
  category: string;
  difficulty: string;
  duration: string;
  steps: unknown[];
  viewCount: number;
  thumbnailUrl?: string;
}

interface TutorialGridProps {
  tutorials: Tutorial[];
  isLoading?: boolean;
}

export function TutorialGrid({ tutorials, isLoading = false }: TutorialGridProps) {
  const t = useTranslations();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden animate-pulse"
          >
            <div className="h-32 bg-gray-200 dark:bg-gray-700" />
            <div className="p-4 space-y-3">
              <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tutorials.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <BookOpen className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
          {t("tutorials.noTutorials")}
        </h3>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {tutorials.map((tutorial) => (
        <TutorialCard
          key={tutorial._id}
          slug={tutorial.slug}
          title={tutorial.title}
          description={tutorial.description}
          category={tutorial.category}
          difficulty={tutorial.difficulty}
          duration={tutorial.duration}
          stepsCount={tutorial.steps.length}
          viewCount={tutorial.viewCount}
          thumbnailUrl={tutorial.thumbnailUrl}
        />
      ))}
    </div>
  );
}

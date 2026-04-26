"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  LabelList,
} from "recharts";
import { TrendUpIcon as TrendingUp, TrendDownIcon as TrendingDown, MinusIcon as Minus } from "@phosphor-icons/react";

type WeeklyData = { week: string; count: number; volumeKg: number };

interface Props {
  data: WeeklyData[];
}

/* 8 distinct green shades — light → mid → dark → mid cycle */
const BAR_COLORS = [
  "#b6d9c6",
  "#7db89a",
  "#5a9e7c",
  "#2e6b4a",
  "#06402B",
  "#1a6b42",
  "#3d8a60",
  "#0a5c3d",
];

function useDarkMode() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

function TrendIndicator({
  current,
  previous,
  label,
}: {
  current: number;
  previous: number;
  label: string;
}) {
  const t = useTranslations("reports");

  if (previous === 0 && current === 0) {
    return (
      <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-700">
        <Minus weight="duotone" className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        <div>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-300">{label}</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">--</p>
        </div>
      </div>
    );
  }

  const pctChange =
    previous === 0
      ? 100
      : Math.round(((current - previous) / previous) * 100);
  const isUp   = pctChange > 0;
  const isDown = pctChange < 0;

  return (
    <div
      className={`flex flex-1 items-center gap-2 rounded-lg border px-3 py-2 ${isDown ? "border-red-200 dark:border-red-900/40" : "border-gray-200 dark:border-gray-700"}`}
    >
      {isUp ? (
        <TrendingUp   weight="duotone" className="h-4 w-4 text-green-600 dark:text-green-400" />
      ) : isDown ? (
        <TrendingDown weight="duotone" className="h-4 w-4 text-red-500" />
      ) : (
        <Minus        weight="duotone" className="h-4 w-4 text-gray-400 dark:text-gray-500" />
      )}
      <div>
        <p className="text-xs font-medium text-gray-600 dark:text-gray-300">{label}</p>
        <p className={`text-sm font-semibold ${isDown ? "text-red-500" : isUp ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}>
          {isUp ? "+" : ""}{pctChange}% {t("vsLastWeek")}
        </p>
      </div>
    </div>
  );
}

export function MonthlyActivityChart({ data }: Props) {
  const t      = useTranslations("reports");
  const isDark = useDarkMode();

  const gridColor = isDark ? "#1e4831" : "#cde0d6";
  const tickColor = isDark ? "#7db89a" : "#4a6b58";
  const labelColor = isDark ? "#e5f2ea" : "#0c1f15";

  const current  = data[data.length - 1];
  const previous = data.length >= 2 ? data[data.length - 2] : null;

  return (
    <div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 24, right: 10, left: -10, bottom: 0 }}
            barCategoryGap="28%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis
              dataKey="week"
              tick={{ fill: tickColor, fontSize: 10 }}
              axisLine={{ stroke: gridColor }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: tickColor, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Bar dataKey="count" name={t("entriesCount")} radius={[4, 4, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} />
              ))}
              <LabelList
                dataKey="count"
                position="top"
                style={{ fill: labelColor, fontSize: 10, fontWeight: 600 }}
                formatter={(v: unknown) => (v === 0 ? "" : (v as number))}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Trend indicators — negative shown in red */}
      {previous && (
        <div className="mt-4 flex gap-3">
          <TrendIndicator
            current={current?.count ?? 0}
            previous={previous.count}
            label={t("weeklyEntries")}
          />
          <TrendIndicator
            current={current?.volumeKg ?? 0}
            previous={previous.volumeKg}
            label={t("weeklyVolume")}
          />
        </div>
      )}
    </div>
  );
}

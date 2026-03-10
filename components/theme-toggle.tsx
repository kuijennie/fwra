"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "@phosphor-icons/react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render after mount
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-7 w-7" />;

  const cycle = () => {
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
  };

  const label =
    theme === "light" ? "Switch to dark mode"
    : theme === "dark" ? "Switch to system"
    : "Switch to light mode";

  return (
    <button
      onClick={cycle}
      aria-label={label}
      title={label}
      className="flex h-7 w-7 items-center justify-center rounded-md text-white/75 transition-colors hover:bg-white/10 hover:text-white"
    >
      {theme === "light"  && <Sun     weight="duotone" className="h-4 w-4" />}
      {theme === "dark"   && <Moon    weight="duotone" className="h-4 w-4" />}
      {theme === "system" && <Monitor weight="duotone" className="h-4 w-4" />}
    </button>
  );
}

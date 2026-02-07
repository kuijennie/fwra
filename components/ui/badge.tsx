import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
}

function Badge({
  className,
  variant = "default",
  size = "md",
  ...props
}: BadgeProps) {
  const variants = {
    default:
      "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
    secondary:
      "bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-200",
    success:
      "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    warning:
      "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    danger: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    info: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  };

  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-0.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}

export { Badge };

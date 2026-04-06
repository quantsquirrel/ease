import type { ReactNode } from "react";

interface BadgeProps {
  variant?: "teal" | "amber" | "positive" | "negative";
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = "teal", children, className = "" }: BadgeProps) {
  const variants = {
    teal: "bg-teal/20 text-teal",
    amber: "bg-amber/20 text-amber",
    positive: "bg-positive/20 text-positive",
    negative: "bg-negative/20 text-negative",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

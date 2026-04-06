import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  variant?: "default" | "highlight";
  className?: string;
}

export function Card({ children, variant = "default", className = "" }: CardProps) {
  const base = "rounded-xl border border-border p-4";
  const variants = {
    default: "bg-surface",
    highlight: "bg-surface shadow-[0_0_20px_var(--color-teal-glow)]",
  };

  return (
    <div className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}

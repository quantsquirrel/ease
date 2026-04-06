"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "amber";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const base = "font-medium transition-all rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-teal text-background hover:shadow-[0_0_30px_rgba(74,155,142,0.3)]",
    secondary: "bg-surface border border-border text-text hover:bg-surface-2",
    amber: "bg-amber text-background hover:shadow-[0_0_30px_rgba(196,149,106,0.3)]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

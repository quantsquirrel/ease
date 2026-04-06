interface ProgressBarProps {
  value: number;
  color?: "teal" | "amber";
  className?: string;
}

export function ProgressBar({ value, color = "teal", className = "" }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const barColor = color === "teal" ? "bg-teal" : "bg-amber";

  return (
    <div className={`h-1.5 w-full rounded-full bg-surface-2 overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-300 ${barColor}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

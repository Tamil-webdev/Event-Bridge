import { useEffect, useState } from "react";
import Card from "./Card";

export default function StatCard({ label, value, icon: Icon, tone = "primary", progress = 0 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = Number(value) || 0;
  const toneVar = `var(--color-${tone})`;

  useEffect(() => {
    let frame;
    const startedAt = performance.now();
    const duration = 700;
    const tick = (now) => {
      const ratio = Math.min((now - startedAt) / duration, 1);
      setDisplayValue(Math.round(numericValue * ratio));
      if (ratio < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [numericValue]);

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[var(--color-text-2)]">{label}</p>
          <p className="mt-2 font-display text-3xl font-bold text-[var(--color-text-1)]">{displayValue}</p>
        </div>
        {Icon && (
          <div
            className="rounded-2xl p-3"
            style={{
              background: `color-mix(in srgb, ${toneVar} 14%, transparent)`,
              color: toneVar,
            }}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--color-border)_65%,transparent)]">
        <div
          className="progress-fill h-full rounded-full"
          style={{ width: `${Math.min(Math.max(progress, 0), 100)}%`, background: toneVar }}
        />
      </div>
    </Card>
  );
}

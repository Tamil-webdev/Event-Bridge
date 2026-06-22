import { SearchX } from "lucide-react";
import { createElement } from "react";
import Button from "./Button";

export default function EmptyState({ title, description, actionLabel, onAction, icon = SearchX }) {
  return (
    <div className="glass-card flex flex-col items-center justify-center px-6 py-14 text-center">
      <div className="mb-5 rounded-2xl bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] p-4 text-[var(--color-primary)]">
        {createElement(icon, { className: "h-9 w-9", "aria-hidden": "true" })}
      </div>
      <h3 className="font-display text-2xl font-bold text-[var(--color-text-1)]">{title}</h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-[var(--color-text-2)]">{description}</p>
      {actionLabel && onAction && (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

import { Loader2 } from "lucide-react";

const variants = {
  primary: "bg-[var(--color-primary)] text-white shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 hover:shadow-blue-500/30",
  secondary:
    "bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] text-[var(--color-primary)] hover:bg-[color-mix(in_srgb,var(--color-primary)_16%,transparent)]",
  ghost: "bg-transparent text-[var(--color-text-2)] hover:bg-[color-mix(in_srgb,var(--color-border)_45%,transparent)] hover:text-[var(--color-text-1)]",
  danger: "bg-[var(--color-danger)] text-white shadow-lg shadow-red-500/20 hover:-translate-y-0.5",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
  icon: "h-10 w-10 p-0",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  disabled,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={[
        "btn-ripple inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 ease-in-out active:scale-95 disabled:pointer-events-none disabled:opacity-60",
        variants[variant],
        sizes[size],
        className,
      ].join(" ")}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}

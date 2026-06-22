import { CheckCircle2, Eye, EyeOff, XCircle } from "lucide-react";
import { useId, useState } from "react";

export default function Field({
  label,
  value,
  onChange,
  error,
  success,
  as = "input",
  type = "text",
  className = "",
  children,
  ...props
}) {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const Component = as;
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className={className}>
      <div className="relative">
        <Component
          id={id}
          value={value}
          onChange={onChange}
          type={Component === "input" ? inputType : undefined}
          placeholder=" "
          aria-invalid={Boolean(error)}
          aria-describedby={error || success ? `${id}-message` : undefined}
          className={[
            "field-input peer w-full rounded-xl border bg-[var(--color-surface)] px-4 py-3 text-[var(--color-text-1)] outline-none transition-all duration-200 placeholder:text-transparent",
            "border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--color-primary)_18%,transparent)]",
            error ? "border-[var(--color-danger)] focus:border-[var(--color-danger)]" : "",
            success ? "border-[var(--color-success)]" : "",
            value ? "has-value" : "",
            as === "textarea" ? "min-h-32 resize-y" : "",
          ].join(" ")}
          {...props}
        >
          {children}
        </Component>
        <label
          htmlFor={id}
          className="field-label pointer-events-none absolute left-4 top-3 text-sm text-[var(--color-text-2)] transition-all duration-200"
        >
          {label}
        </label>
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[var(--color-text-2)] hover:text-[var(--color-text-1)]"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
        {!isPassword && (error || success) && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            {error ? (
              <XCircle className="h-5 w-5 text-[var(--color-danger)]" aria-hidden="true" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-[var(--color-success)]" aria-hidden="true" />
            )}
          </span>
        )}
      </div>
      {(error || success) && (
        <p
          id={`${id}-message`}
          className={`mt-2 text-sm ${error ? "text-[var(--color-danger)]" : "text-[var(--color-success)]"}`}
          role={error ? "alert" : "status"}
        >
          {error || success}
        </p>
      )}
    </div>
  );
}

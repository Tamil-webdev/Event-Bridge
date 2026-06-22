import { ImagePlus, Trash2, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import Button from "./Button";

export default function ImageUploader({
  label,
  value,
  onChange,
  onRemove,
  aspect = "aspect-[16/9]",
  avatar = false,
}) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFile = (file) => {
    if (!file) return;
    setProgress(15);
    const reader = new FileReader();
    reader.onload = () => {
      onChange?.({ file, preview: reader.result });
    };
    reader.readAsDataURL(file);
    const interval = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          clearInterval(interval);
          return 100;
        }
        return current + 17;
      });
    }, 90);
  };

  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-[var(--color-text-1)]">{label}</p>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          handleFile(event.dataTransfer.files?.[0]);
        }}
        className={[
          "group relative overflow-hidden border border-dashed transition-all duration-200",
          avatar ? "h-32 w-32 rounded-full" : `${aspect} rounded-2xl`,
          dragging
            ? "border-[var(--color-primary)] bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)]"
            : "border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_75%,transparent)]",
        ].join(" ")}
        aria-label={`Upload ${label}`}
      >
        {value ? (
          <img
            src={value}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-[var(--color-text-2)]">
            <ImagePlus className="h-7 w-7" aria-hidden="true" />
            <span className="px-4 text-center text-sm">Drop image here or click to upload</span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-black/10">
          {progress > 0 && <div className="h-full bg-[var(--color-success)] transition-all" style={{ width: `${progress}%` }} />}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <Button size="sm" variant="secondary" onClick={() => inputRef.current?.click()}>
          <UploadCloud className="h-4 w-4" aria-hidden="true" />
          Replace
        </Button>
        {value && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              onRemove?.();
              setProgress(0);
            }}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Remove
          </Button>
        )}
      </div>
      {value && (
        <p className="mt-2 text-xs text-[var(--color-text-2)]" role="status">
          Preview ready. Use replace to choose another image before confirming.
        </p>
      )}
    </div>
  );
}

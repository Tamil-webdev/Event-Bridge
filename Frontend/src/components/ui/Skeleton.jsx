export function Skeleton({ className = "" }) {
  return <div className={["skeleton rounded-xl", className].join(" ")} aria-hidden="true" />;
}

export function CardGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="glass-card p-4">
          <Skeleton className="aspect-[16/9] w-full" />
          <Skeleton className="mt-5 h-4 w-24" />
          <Skeleton className="mt-3 h-6 w-4/5" />
          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-2/3" />
        </div>
      ))}
    </div>
  );
}

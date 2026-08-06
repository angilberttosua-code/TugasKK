interface SkeletonCardProps {
  variant?: "project" | "certificate" | "testimonial";
}

export default function SkeletonCard({ variant = "project" }: SkeletonCardProps) {
  if (variant === "certificate") {
    return (
      <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800/40 animate-pulse flex flex-col justify-between h-64">
        <div>
          <div className="w-12 h-12 rounded-xl bg-gray-800 mb-6" />
          <div className="h-6 bg-gray-800 rounded-md w-3/4 mb-3" />
          <div className="h-4 bg-gray-800 rounded-md w-1/2 mb-4" />
          <div className="space-y-2">
            <div className="h-3 bg-gray-800 rounded-md w-1/3" />
            <div className="h-3 bg-gray-800 rounded-md w-2/5" />
          </div>
        </div>
        <div className="h-4 bg-gray-800 rounded-md w-1/4 mt-6" />
      </div>
    );
  }

  if (variant === "testimonial") {
    return (
      <div className="p-6 sm:p-8 rounded-2xl bg-gray-900/40 border border-gray-800/40 animate-pulse flex flex-col justify-between h-72">
        <div>
          <div className="flex gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-4 h-4 bg-gray-800 rounded-full" />
            ))}
          </div>
          <div className="space-y-2 mb-8">
            <div className="h-4 bg-gray-800 rounded-md w-full" />
            <div className="h-4 bg-gray-800 rounded-md w-5/6" />
            <div className="h-4 bg-gray-800 rounded-md w-4/5" />
          </div>
        </div>
        <div className="flex items-center gap-4 pt-4 border-t border-gray-800/40">
          <div className="w-12 h-12 rounded-full bg-gray-800 shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-800 rounded-md w-1/2" />
            <div className="h-3 bg-gray-800 rounded-md w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full rounded-2xl bg-gray-900/40 border border-gray-800/40 overflow-hidden animate-pulse">
      <div className="aspect-video bg-gray-800 border-b border-gray-800/40" />

      <div className="p-6 flex flex-col flex-1">
        <div className="h-3 bg-gray-800 rounded-md w-1/4 mb-3" />
        <div className="h-6 bg-gray-800 rounded-md w-3/4 mb-3" />
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-gray-800 rounded-md w-full" />
          <div className="h-4 bg-gray-800 rounded-md w-5/6" />
        </div>

        <div className="flex gap-1.5 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 bg-gray-800 rounded-md w-14" />
          ))}
        </div>

        <div className="flex gap-4 pt-4 border-t border-gray-800/40 mt-auto">
          <div className="h-4 bg-gray-800 rounded-md w-16" />
          <div className="h-4 bg-gray-800 rounded-md w-16" />
        </div>
      </div>
    </div>
  );
}
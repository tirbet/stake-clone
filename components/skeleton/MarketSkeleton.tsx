import { cn } from "@/lib/utils";

export default function MarketSkeleton({ colClass = "grid-cols-2" }) {
  return (
    <div className="flex items-center justify-center font-sans mt-2">
      <div className="w-full bg-betslip mt-2 max-w-full text-white shadow-lg overflow-hidden">
        {/* Header Skeleton */}
        <header className="flex justify-between items-center bg-betslip p-2 border-b border-slate-700">
          <div className="h-4 w-24 bg-slate-600 rounded animate-pulse" />
          <div className="h-4 w-4 bg-slate-600 rounded-full animate-pulse" />
        </header>

        {/* Body Skeleton */}
        <div className="grid grid-rows-[1fr] opacity-100">
          <div className="overflow-hidden">
            <main className="p-4">
              <div className={cn("grid grid-cols-1 gap-4", colClass)}>
                {[...Array(2)].map((_, colIndex) => (
                  <div key={colIndex} className="flex flex-col gap-2">
                    {[...Array(3)].map((_, rowIndex) => (
                      <div
                        key={rowIndex}
                        className="flex items-center justify-between rounded-md p-3 bg-[rgb(7,24,36)] animate-pulse"
                      >
                        <span className="h-4 w-20 bg-slate-600 rounded" />
                        <span className="h-4 w-10 bg-slate-700 rounded" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

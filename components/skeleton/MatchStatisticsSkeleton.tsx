import { CloudSun, Info, LineChart } from "lucide-react";

export default function MatchStatisticsSkeleton() {
  return (
    <div className="relative flex w-full h-48 md:h-64 max-h-[300px] animate-pulse">
      {/* Background placeholder */}
      <div className="absolute inset-0 w-full h-full bg-gray-700 opacity-30 rounded-sm" />

      {/* Tabs container */}
      <div className="relative w-full flex flex-col">
        {/* Tab content placeholder */}
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center gap-3">
            {/* ScoreInfo placeholder */}
            <div className="flex gap-4">
              <div className="w-24 h-6 bg-gray-600 rounded" />
              <div className="w-16 h-6 bg-gray-600 rounded" />
            </div>

            {/* WeatherCard placeholder */}
            <div className="flex gap-2">
              <div className="w-32 h-20 bg-gray-600 rounded" />
              <div className="w-32 h-20 bg-gray-600 rounded" />
            </div>

            {/* ScoreContext placeholder */}
            <div className="flex flex-col gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-4 bg-gray-600 rounded w-48 md:w-64" />
              ))}
            </div>
          </div>
        </div>

        {/* TabsList placeholder */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-0.5 bg-gray-700/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
          <div className="w-10 h-10 bg-gray-500 rounded-full" />
          <div className="w-10 h-10 bg-gray-500 rounded-full" />
          <div className="w-10 h-10 bg-gray-500 rounded-full" />
        </div>
      </div>
    </div>
  );
}

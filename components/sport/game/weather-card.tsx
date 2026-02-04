import { useMemo } from "react"
import { useGetGame } from "@/features/sport/api/use-get-game"
import type { GetSportsResponse } from "@/features/sport/api/use-get-sport"
import { cn } from "@/lib/utils"

import {
    SunIcon,
    WindIcon,
    GaugeIcon,
    DropletsIcon,
    UmbrellaIcon,
    CompassIcon,
    ThermometerIcon,
    CloudIcon,
} from "lucide-react"

/* ---------------------------------- Types --------------------------------- */

type WeatherConfigItem = {
    value?: string
    unit?: string
    label?: string
    description?: string
    icon: React.ReactNode
}

type UVConfig = {
    level: string
    color: string
    message: string
}

/* -------------------------------- UV Logic -------------------------------- */

function getUVConfig(uv?: number): UVConfig {
    if (uv === undefined || Number.isNaN(uv)) {
        return {
            level: "N/A",
            color: "text-gray-400",
            message: "No UV data",
        }
    }

    if (uv <= 2) {
        return {
            level: "Low",
            color: "text-green-500",
            message: "Safe for outdoor activities",
        }
    }

    if (uv <= 5) {
        return {
            level: "Moderate",
            color: "text-yellow-500",
            message: "Use sun protection",
        }
    }

    if (uv <= 7) {
        return {
            level: "High",
            color: "text-orange-500",
            message: "Reduce sun exposure",
        }
    }

    if (uv <= 10) {
        return {
            level: "Very High",
            color: "text-red-500",
            message: "Extra protection required",
        }
    }

    return {
        level: "Extreme",
        color: "text-purple-600",
        message: "Avoid being outside",
    }
}

/* ---------------------------- Weather Config ------------------------------- */

function buildWeatherConfig(
    data: GetSportsResponse[number]["weather"]
): Record<string, WeatherConfigItem> {
    const uvValue = Number(data?.uvIndex)
    const uv = getUVConfig(uvValue)

    return {
        uvIndex: {
            label: "UV",
            value: Number.isFinite(uvValue) ? String(uvValue) : undefined,
            unit: uv.level,
            description: uv.message,
            icon: (
                <SunIcon
                    className={cn(
                        "w-2.5 h-2.5 md:w-3.5 md:h-3.5",
                        uv.color,
                        {
                            "animate-pulse": uvValue >= 8,
                            "opacity-60": uvValue <= 2,
                        }
                    )}
                />
            ),
        },

        wind: {
            label: data?.windDirection ? `Wind ${data.windDirection}` : "Wind",
            value: data?.windSpeed ? String(data.windSpeed) : undefined,
            unit: data?.windUnit,
            icon: (
                <WindIcon className="text-sky-300 w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
            ),
        },

        pressure: {
            label: "Pressure",
            value: data?.pressure?.value
                ? String(data.pressure.value)
                : undefined,
            unit: "mmHg",
            icon: (
                <GaugeIcon className="text-purple-300 w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
            ),
        },

        humidity: {
            label: "Humidity",
            value: data?.humidity?.value
                ? String(data.humidity.value)
                : undefined,
            unit: "%",
            icon: (
                <DropletsIcon className="text-cyan-300 w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
            ),
        },

        precipitation: {
            label: "Rain",
            value: data?.precipitation?.value
                ? String(data.precipitation.value)
                : undefined,
            unit: data?.precipitation?.unit,
            icon: (
                <UmbrellaIcon className="text-indigo-300 w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
            ),
        },

        cloudLevel: {
            label: "Cloud",
            value: data?.cloudLevel ? String(data.cloudLevel) : undefined,
            unit: "%",
            icon: (
                <CompassIcon className="text-pink-300 w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
            ),
        },
    }
}

/* --------------------------- Reusable Stat Item ----------------------------- */

function WeatherStat({ icon, label, value, unit, description }: WeatherConfigItem) {
    if (!unit) return null

    return (
        <div className="group relative flex items-center gap-1 cursor-help">
            {icon}
            <div className="text-xs font-medium">
                {unit}
                {value && (
                    <span className="ml-1 text-[10px] text-muted-foreground">
                        {value}
                    </span>
                )}
            </div>

            {(label || description) && (
                <div className="absolute left-0 top-full z-10 hidden group-hover:block
                        bg-black/80 text-white text-xs p-2 rounded-md w-48">
                    {label && <div className="font-semibold">{label}</div>}
                    {description && <div className="opacity-80">{description}</div>}
                </div>
            )}
        </div>
    )
}


/* ------------------------------- Main Card --------------------------------- */
type WeatherCardProps = {
    data?: GetSportsResponse[number];
}
export function WeatherCard({ data }: Readonly<WeatherCardProps>) {

    if (!data?.weather) return null

    const config = useMemo(
        () => buildWeatherConfig(data.weather),
        [data.weather]
    )


    return (
        <div className="min-w-62.5 md:min-w-87.5 bg-[rgb(26,44,56)] rounded-sm">
            {/* Header */}
            <div className="flex p-1 items-center justify-between bg-sidebar rounded-sm shadow-md">
                <div className="flex items-center gap-1">
                    <ThermometerIcon className="text-orange-400 w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
                    <span className="text-sm font-bold">
                        {data.weather.temperature}
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    <CloudIcon className="text-blue-300 w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
                    <span className="text-sm">
                        {data.weather.cloudDescription}
                    </span>
                </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 p-1.5">
                {Object.entries(config).map(([key, item]) => (
                    <WeatherStat key={key} {...item} />
                ))}
            </div>
        </div>
    )
}

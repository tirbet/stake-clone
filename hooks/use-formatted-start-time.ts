// use-formatted-start-time.ts
import { useMemo } from "react";
import {
    fromUnixTime,
    differenceInMinutes,
    differenceInHours,
    isTomorrow,
    isThisYear,
    format,
    isPast,
} from "date-fns";
import { enUS } from "date-fns/locale";

export const useFormattedStartTime = (
    startTime: number | undefined,
    locale: string
) => {
    return useMemo(() => {
        if (!startTime) return null;

        try {
            const startDate =
                startTime < 1e12
                    ? fromUnixTime(startTime)
                    : new Date(startTime);

            if (isPast(startDate)) return "Live";

            const now = new Date();
            const hoursDiff = differenceInHours(startDate, now);

            if (hoursDiff === 0) {
                const mins = differenceInMinutes(startDate, now);
                return `${mins}m`;
            }

            if (hoursDiff > 0 && hoursDiff < 24) {
                return `${hoursDiff}h`;
            }

            if (isTomorrow(startDate)) {
                return "Tomorrow";
            }

            if (isThisYear(startDate)) {
                return format(startDate, "dd MMM", { locale: enUS });
            }

            return format(startDate, "dd MMM yyyy", { locale: enUS });
        } catch {
            return "—";
        }
    }, [startTime, locale]);
};

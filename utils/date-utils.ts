// utils/date-utils.ts
import {
    format,
    parseISO,
    formatDistanceToNow,
    differenceInDays,
    isToday,
    isYesterday,
    startOfDay,
    addDays,
    getUnixTime
} from 'date-fns';
import { enUS, bn, hi } from 'date-fns/locale';
import { Locale } from 'date-fns';

type LocaleCode = 'en' | 'bn' | 'hi';
type DateFormat = string;

const locales: Record<LocaleCode, Locale> = { en: enUS, bn, hi };

/**
 * Format ISO date string to local date
 */
export function formatLocalDate(
    isoString: string | null | undefined,
    formatStr: DateFormat = 'PPPpp',
    locale: LocaleCode = 'en'
): string {
    if (!isoString) return '';
    try {
        const date = parseISO(isoString);
        return format(date, formatStr, { locale: locales[locale] });
    } catch {
        return ''; // Return empty string on invalid dates
    }
}

/**
 *  Get relative time with timezone awareness
 */
export function getLocalRelativeTime(
  isoString: string | null | undefined,
  locale: LocaleCode = 'en',
  showTime: boolean = true
): string {
  if (!isoString) return '';

  const localDate = new Date(isoString); // Already in browser local timezone

  const relativeTime = formatDistanceToNow(localDate, {
    addSuffix: true,
    locale: locales[locale],
  });

  if (!showTime) return relativeTime;

  const localTime = format(localDate, 'h:mm a', { locale: locales[locale] });
  return `${relativeTime} (${localTime})`;
}

/**
 * Smart date formatting (Today/Yesterday/Weekday/Date)
 */
export function smartDateFormat(
    isoString: string | null | undefined,
    locale: LocaleCode = 'en'
): string {
    if (!isoString) return '';

    const date = parseISO(isoString);

    if (isToday(date)) {
        return format(date, 'h:mm a', { locale: locales[locale] });
    }
    if (isYesterday(date)) {
        return locale === 'en' ? 'Yesterday' :
            locale === 'bn' ? 'গতকাল' :
                'कल'; // Hindi
    }
    if (differenceInDays(new Date(), date) <= 7) {
        return format(date, 'EEEE', { locale: locales[locale] }); // Weekday name
    }
    return format(date, 'MMM d, yyyy', { locale: locales[locale] });
}

/**
 * Format verification date simply
 */
export function formatVerificationDate(
    verifiedAt: string | null | undefined,
    locale: LocaleCode = 'en'
): string {
    if (!verifiedAt) return '';
    return formatLocalDate(verifiedAt, 'MMMM d, yyyy', locale);
}

type FilterKey =
  | { minOffset: number }
  | { tsTo: number }
  | { tsFrom: number; tsTo: number };

type TimeFilterOption = {
  key: FilterKey;
  label: string;
};

type TimeFilterGroup = {
  label: string;
  values: TimeFilterOption[];
};


export const generateTimeFilter = (): TimeFilterGroup[] => {
  const now = new Date();

  const hourlyOffsets = [60, 120, 180, 360, 720, 1440];
  const hourly: TimeFilterOption[] = hourlyOffsets.map((minutes) => ({
    key: { minOffset: minutes },
    label: `Next ${minutes / 60}${minutes === 60 ? ' Hour' : ' Hours'}`
  }));

  const daily: TimeFilterOption[] = Array.from({ length: 5 }).map((_, i) => {
    const dayStart = startOfDay(addDays(now, i));
    const dayEnd = startOfDay(addDays(now, i + 1));
    const tsFrom = getUnixTime(dayStart);
    const tsTo = getUnixTime(dayEnd);

    let label: string;
    if (i === 0) label = 'Today';
    else if (i === 1) label = 'Tomorrow';
    else if (i === 2) label = 'Day after tomorrow';
    else label = format(dayStart, 'M/d/yyyy');

    const key: FilterKey = i === 0
      ? { tsTo } // only tsTo for Today
      : { tsFrom, tsTo };

    return {
      key,
      label
    };
  });

  return [
    {
      label: 'Hourly',
      values: hourly
    },
    {
      label: 'Daily',
      values: daily
    }
  ];
};
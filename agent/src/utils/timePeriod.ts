export type TimePeriod = 'MORNING' | 'AFTERNOON' | 'EVENING' | 'LATE_NIGHT';

export function getTimePeriodForHour(hour: number): TimePeriod {
  if (hour >= 5 && hour < 12) {
    return 'MORNING';
  } else if (hour >= 12 && hour < 17) {
    return 'AFTERNOON';
  } else if (hour >= 17 && hour < 22) {
    return 'EVENING';
  } else {
    return 'LATE_NIGHT';
  }
}

export function getTimePeriod(date: Date, timezone: string): TimePeriod {
  // Use Intl.DateTimeFormat to extract the hour in the specified timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    hour12: false,
  });

  const hourStr = formatter.format(date);
  const hour = parseInt(hourStr, 10);
  return getTimePeriodForHour(hour);
}

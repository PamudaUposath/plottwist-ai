const LAST_VISIT_KEY = 'plottwist_autopilot_last_visit';

export function getLastVisitTimestamp(): string | null {
  return localStorage.getItem(LAST_VISIT_KEY);
}

export function updateLastVisitTimestamp(timestamp: string = new Date().toISOString()): void {
  localStorage.setItem(LAST_VISIT_KEY, timestamp);
}

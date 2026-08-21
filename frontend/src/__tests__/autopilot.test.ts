import { describe, it, expect, beforeEach } from 'vitest';
import { getLastVisitTimestamp, updateLastVisitTimestamp } from '../utils/lastVisit';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Autopilot Frontend Storage & Utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('first visit behaviour returns null for last visit timestamp', () => {
    expect(getLastVisitTimestamp()).toBeNull();
  });

  it('saves and retrieves last visit timestamp correctly', () => {
    const isoString = new Date().toISOString();
    updateLastVisitTimestamp(isoString);
    expect(getLastVisitTimestamp()).toBe(isoString);
  });
});

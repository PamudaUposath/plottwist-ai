/**
 * Deterministic PRNG implementation using Mulberry32 algorithm.
 */
export class SeededRandom {
  private state: number;

  constructor(seed: number | string) {
    if (typeof seed === 'string') {
      this.state = SeededRandom.hashString(seed);
    } else {
      this.state = seed >>> 0;
    }
    if (this.state === 0) {
      this.state = 0x6d2b79f5;
    }
  }

  public static hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return hash >>> 0;
  }

  public static generateSeed(): number {
    return Math.floor(Math.random() * 2147483647) + 1;
  }

  /**
   * Returns a pseudo-random float in range [0, 1)
   */
  public next(): number {
    let t = (this.state += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /**
   * Returns a pseudo-random integer in range [min, max] inclusive
   */
  public int(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  /**
   * Returns a random element from an array
   */
  public choice<T>(array: T[]): T {
    if (array.length === 0) {
      throw new Error('Cannot pick choice from empty array.');
    }
    const index = this.int(0, array.length - 1);
    return array[index];
  }

  /**
   * Returns a shuffled copy of an array using Fisher-Yates algorithm
   */
  public shuffle<T>(array: T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = this.int(0, i);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}

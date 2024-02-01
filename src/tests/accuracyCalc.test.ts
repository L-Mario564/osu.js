import { calcAccuracy } from '../utils/constants';
import { describe, expect, it } from 'vitest';

function fixDecimals(accuracy: number): number {
  return Number(accuracy.toFixed(4));
}

describe('Test accuracy calculating functions', () => {
  it('Calculates for STD', () => {
    const accuracy: number = fixDecimals(calcAccuracy.osu(1756, 26, 0, 0));
    expect(accuracy).toBe(0.9903);
  });

  it('Calculates for Taiko', () => {
    const accuracy: number = fixDecimals(calcAccuracy.taiko(2896, 55, 0));
    expect(accuracy).toBe(0.9907);
  });

  it('Calculates for CTB', () => {
    const accuracy: number = fixDecimals(calcAccuracy.fruits(3277, 75, 557, 5, 0));
    expect(accuracy).toBe(0.9987);
  });

  it('Calculates for Mania (score v1)', () => {
    const accuracy: number = fixDecimals(calcAccuracy.mania(6349, 1940, 126, 15, 5, 24));
    expect(accuracy).toBe(0.9905);
  });

  it('Calculates for Mania (score v2)', () => {
    const accuracy: number = fixDecimals(calcAccuracy.mania(6349, 1940, 126, 15, 5, 24, true));
    expect(accuracy).toBe(0.9866);
  });
});

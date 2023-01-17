import { getStdAccuracy, getTaikoAccuracy, getCtbAccuracy, getManiaAccuracy } from '../utils';
import { describe, expect, it } from 'vitest';

function fixDecimals(accuracy: number): number {
  return Number(accuracy.toFixed(4));
}

describe('Test accuracy calculating functions', (): void => {
  it('Calculates for STD', (): void => {
    let accuracy: number = fixDecimals(getStdAccuracy(1756, 26, 0, 0));
    expect(accuracy).toBe(0.9903);
  });

  it('Calculates for Taiko', (): void => {
    let accuracy: number = fixDecimals(getTaikoAccuracy(2896, 55, 0));
    expect(accuracy).toBe(0.9907);
  });

  it('Calculates for CTB', (): void => {
    let accuracy: number = fixDecimals(getCtbAccuracy(3277, 75, 557, 5, 0));
    expect(accuracy).toBe(0.9987);
  });

  it('Calculates for Mania (score v1)', (): void => {
    let accuracy: number = fixDecimals(getManiaAccuracy(6349, 1940, 126, 15, 5, 24));
    expect(accuracy).toBe(0.9905);
  });

  it('Calculates for Mania (score v2)', (): void => {
    let accuracy: number = fixDecimals(getManiaAccuracy(6349, 1940, 126, 15, 5, 24, true));
    expect(accuracy).toBe(0.9866);
  });
});
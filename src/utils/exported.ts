import { ModsEnum } from './enums';
import { isOsuJSErrorSymbol } from '../classes/Errors';
import type { Mod, OsuJSError } from '../types';

/**
 * Convert an array of mods into its numerical representation
 */
export function getModsEnum(mods: Mod[]): number {
  return mods.reduce((count, mod) => count + ModsEnum[mod], 0);
}

/**
 * Convert a numerical representation of a mod or mod combination into an array of mods represented as strings. Returns and empty array if the input is 0.
 */
export function getEnumMods(modEnum: number): Mod[] {
  const mods: Mod[] = [];

  if (modEnum === 0) return mods;

  let parsedGlobalEnum: number = Number(modEnum);
  let modEnums: string[] = Object.keys(ModsEnum);
  modEnums = modEnums.splice(0, modEnums.length / 2);

  for (let i = modEnums.length; parsedGlobalEnum !== 0; i--) {
    const parsedEnum: number = Number(modEnums[i]);

    if (parsedGlobalEnum - parsedEnum >= 0) {
      mods.push(ModsEnum[parsedEnum] as Mod);
      parsedGlobalEnum -= parsedEnum;
    }
  }

  return mods.reverse();
}

/**
 * Determine if a value is an error thrown by osu.js
 */
export function isOsuJSError(value: any): value is OsuJSError {
  return typeof value === 'object' && value?._?.[isOsuJSErrorSymbol] === true;
}

import { ModsEnum } from './enums';
import { isOsuJSErrorSymbol } from '../classes/Errors';
import type { Mod, OsuJSError } from '../types';

/**
 * Convert an array of mods into its numerical representation. Only works with mods that are present in both legacy and current APIs. Only works with mods inside [this enum](https://github.com/ppy/osu-api/wiki#mods).
 *
 * Documentation: {@link https://osujs.mario564.com/extras/mod-enum-conversion}
 * @see getEnumMods for the inverse operation
 */
export function getModsEnum(mods: Mod[], derivativeModsWithOriginal?: boolean): number {
  return mods.reduce((count, mod) => {
    if (
      ![
        'NF',
        'EZ',
        'TD',
        'HD',
        'HR',
        'SD',
        'DT',
        'RX',
        'HT',
        'NC',
        'FL',
        'AT',
        'SO',
        'AP',
        'PF',
        '4K',
        '5K',
        '6K',
        '7K',
        '8K',
        'FI',
        'RD',
        'CN',
        'TP',
        'K9',
        'KC',
        '1K',
        '2K',
        '3K',
        'SV2',
        'MR'
      ].includes(mod)
    )
      return count;
      
    if (mod === 'NC' && derivativeModsWithOriginal)
      return count + ModsEnum.NC + ModsEnum.DT;
    if (mod === 'PF' && derivativeModsWithOriginal)
      return count + ModsEnum.PF + ModsEnum.SD;

    return count + ModsEnum[mod as keyof typeof ModsEnum];
  }, 0);
}

/**
 * Convert a numerical representation of a mod or mod combination into an array of mods represented as strings. Returns and empty array if the input is 0. Only works with mods inside [this enum](https://github.com/ppy/osu-api/wiki#mods).
 *
 * Documentation: {@link https://osujs.mario564.com/extras/mod-enum-conversion}
 * @see getModsEnum for the inverse operation
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

  if ((['DT', 'NC'] as Mod[]).every((mod) => mods.includes(mod))) {
    const i = mods.indexOf('DT');
    mods.splice(i, 1);
  } else if ((['SD', 'PF'] as Mod[]).every((mod) => mods.includes(mod))) {
    const i = mods.indexOf('SD');
    mods.splice(i, 1);
  }

  return mods.reverse();
}

/**
 * Determine if a value is an error thrown by osu.js
 *
 * Documentation: {@link https://osujs.mario564.com/extras/error-handling}
 */
export function isOsuJSError(value: any): value is OsuJSError {
  return typeof value === 'object' && value?._?.[isOsuJSErrorSymbol] === true;
}

import { Mod } from '../types';
import { ModsEnum } from './enums';

export function sleep(ms: number): Promise<unknown> {
  return new Promise((resolve: (value: unknown) => unknown) => setTimeout(resolve, ms));
}

export function formatUrlParams(urlParams: Record<string, unknown>): string {
  return Object.entries(urlParams).reduce((prev: string, [key, value]) => {
    if (!value) return prev;

    return Array.isArray(value)
      ? `${prev}${value.reduce((prev: string, value) => `${prev}&${key}[]=${value}`, '')}`
      : `${prev}&${key}=${value}`;
  }, '');
}

export function map<T>(obj: Record<string, unknown>): T {
  let entries: [string, unknown][] = Object.entries(obj);
  entries = entries.map(mapCallback);

  entries.forEach(([key, value]: [string, unknown]): void => {
    obj[key] = value;
  });

  return obj as T;
}

export function mapCallback([key, value]: [string, unknown]): [string, unknown] {
  let newValue: unknown = value;

  if (Array.isArray(value) && typeof value[0] === 'object') {
    newValue = value.map((v) => map(v));
  } else if (typeof value === 'object' && value) {
    newValue = map(value as Record<string, unknown>);
  } else if (!isNaN(Number(value)) && typeof value !== 'boolean') {
    newValue = Number(value);
  }

  return [key, newValue];
}

// Functions to re-export

export function getModsEnum(mods: Mod[]): number {
  return mods.reduce((count, mod) => count + ModsEnum[mod], 0);
}

export function getEnumMods(modEnum: string | null): Mod[] {
  let mods: Mod[] = [];

  if (!modEnum || modEnum === '0') return mods;

  let parsedGlobalEnum: number = Number(modEnum);
  let modEnums: string[] = Object.keys(ModsEnum);
  modEnums = modEnums.splice(0, modEnums.length / 2);

  for (let i = modEnums.length; parsedGlobalEnum !== 0; i--) {
    let parsedEnum: number = Number(modEnums[i]);

    if (parsedGlobalEnum - parsedEnum >= 0) {
      mods.push(ModsEnum[parsedEnum] as Mod);
      parsedGlobalEnum -= parsedEnum;
    }
  }

  return mods.reverse();
}

import { AnyObject, Mod } from '../types';
import { ModsEnum } from './enums';

export function sleep(ms: number): Promise<unknown> {  
  return new Promise((resolve: (value: unknown) => any) => setTimeout(resolve, ms));  
}

/**
 * Parse numbers and dates in the object, since everything is returned as a string in the legacy API
 * @param obj Any object, usually data from a response
 * @returns The same inputted object with numbers and dates parsed
 */
export function map<T>(obj: Record<string, any>): T {
  let entries: [string, unknown][] = Object.entries(obj);
  entries = entries.map(mapCallback);

  entries.forEach(([key, value]: [string, unknown]): void => {
    obj[key] = value;
  });

  return obj as T;
}

export function mapCallback([key, value]: [string, unknown]): [string, unknown] {
  let newValue: unknown = value;

  if (Array.isArray(value) && typeof value[0] === 'object')
    newValue = value.map((v: AnyObject): AnyObject => map<AnyObject>(v));
  else if (!isNaN(Number(value)) && typeof value !== 'boolean')
    newValue = Number(value);
  else if (typeof value === 'string' && !isNaN(new Date(value).getHours()))
    newValue = new Date(value);
  
  return [key, newValue];
}

const baseUrl: string = 'https://osu.ppy.sh/';

/**
 * @param beatmapSetId 
 * @returns The URL for the beatmap set cover
 */
export function beatmapCoverUrl(beatmapSetId: number): string {
  return `https://assets.ppy.sh/beatmaps/${beatmapSetId}/covers/cover.jpg`;
}

export function beatmapThumbnailUrl(beatmapSetId: number): string {
  return `https://b.ppy.sh/thumb/${beatmapSetId}l.jpg`;
}

export function beatmapUrl(beatmapId: number): string {
  return `${baseUrl}b/${beatmapId}`;
}

export function beatmapSetUrl(beatmapSetId: number): string {
  return `${baseUrl}s/${beatmapSetId}`;
}

export function userImgUrl(userId: number): string {
  return `http://s.ppy.sh/a/${userId}`;
}

export function userUrl(userId: number): string {
  return `${baseUrl}users/${userId}`;
}

export function getStdAccuracy(c300: number, c100: number, c50: number, misses: number): number {
  return (
    ((6 * c300) + (2 * c100) + c50) /
    (6 * (c300 + c100 + c50 + misses))
  );
}

export function getTaikoAccuracy(geki: number, katu: number, misses: number): number {
  return (
    ((2 * geki) + katu) /
    (2 * (geki + katu + misses))
  );
}

export function getCtbAccuracy(c300: number, c100: number, c50: number, katu: number, misses: number): number {
  let x: number = c300 + c100 + c50;
  return x / (x + katu + misses);
}

export function getManiaAccuracy(geki: number, c300: number, katu: number, c100: number, c50: number, misses: number, scoreV2?: boolean): number {
  let x: number = (scoreV2) ? (305 * geki) + (300 * c300) : 300 * (geki + c300);
  let y: number = (scoreV2) ? 305 : 300;

  return (
    (x + (200 * katu) + (100 * c100) + (50 * c50)) /
    (y * (geki + c300 + katu + c100 + c50 + misses))    
  );
}

export const calculate = {
  hr: {
    cs: (n: number): number => n * 1.3,
    od: hrStat,
    ar: hrStat,
    hp: hrStat
  },
  dt: {
    od: (n: number): number => (53 + (8 * n)) / 12,
    bpm: (n: number): number => n * 1.5,
    ar: (n: number): number => {
      let x: number = (n <= 5) ?
        (75 + (8 * n)) / 15 :
        (13 + (2 * n)) / 3;

      return Math.min(x, 11);
    },
    length: (n: number): number => n / 1.5
  },
  ez: {
    cs: ezStat,
    od: ezStat,
    ar: ezStat,
    hp: ezStat
  },
  ht: {
    od: (n: number): number => (-53 + (16 * n)) / 12,
    bpm: (n: number): number => n * 0.75,
    ar: (n: number): number => {
      return (n <= 5) ?
        (4 / 3) * n - 5 :
        (n > 7) ?
          (4 / 3) * n - (13 / 3) :
          (4 / 3) * n - (19 / 3);
    },
    length: (n: number): number => n * 0.75
  }
};

export function getModsEnum(mods: Mod[]): number {
	return mods.reduce((count: number, mod: Mod) => count + ModsEnum[mod], 0);
}

// Helper functions
function hrStat(n: number): number {
  return Math.min(n * 1.4, 10);
}

function ezStat(n: number): number {
  return n / 2;
}
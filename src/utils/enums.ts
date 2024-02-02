/**
 * Documentation: {@link https://osujs.mario564.com/references/modes-enum}
 */
export enum ModesEnum {
  osu = 0,
  taiko = 1,
  fruits = 2,
  mania = 3
}

/**
 * Documentation: {@link https://osujs.mario564.com/references/status-enum}
 */
export enum StatusEnum {
  graveyard = -2,
  wip = -1,
  pending = 0,
  ranked = 1,
  approved = 2,
  qualified = 3,
  loved = 4
}

/**
 * Documentation: {@link https://osujs.mario564.com/references/genres-enum}
 */
export enum GenresEnum {
  Any = 0,
  Unspecified = 1,
  'Video Game' = 2,
  Anime = 3,
  Rock = 4,
  Pop = 5,
  Other = 6,
  Novelty = 7,
  'Hip Hop' = 9,
  Electronic = 10,
  Metal = 11,
  Classical = 12,
  Folk = 13,
  Jazz = 14
}

/**
 * Documentation: {@link https://osujs.mario564.com/references/languages-enum}
 */
export enum LanguagesEnum {
  Any = 0,
  Unspecified = 1,
  English = 2,
  Japanese = 3,
  Chinese = 4,
  Instrumental = 5,
  Korean = 6,
  French = 7,
  German = 8,
  Swedish = 9,
  Spanish = 10,
  Italian = 11,
  Russian = 12,
  Polish = 13,
  Other = 14
}

/**
 * Documentation: {@link https://osujs.mario564.com/references/mods-enum}
 */
export enum ModsEnum {
  NF = 1,
  EZ = 2,
  TD = 4,
  HD = 8,
  HR = 16,
  SD = 32,
  DT = 64,
  RX = 128,
  HT = 256,
  NC = 512,
  FL = 1024,
  AT = 2048,
  SO = 4096,
  AP = 8192,
  PF = 16384,
  '4K' = 32768,
  '5K' = 65536,
  '6K' = 131072,
  '7K' = 262144,
  '8K' = 524288,
  FI = 1048576,
  RD = 2097152,
  CN = 4194304,
  TP = 8388608,
  K9 = 16777216,
  KC = 33554432,
  '1K' = 67108864,
  '3K' = 134217728,
  '2K' = 268435456,
  SV2 = 536870912,
  MR = 1073741824
}

/**
 * Documentation: {@link https://osujs.mario564.com/references/scoring-type-enum}
 */
export enum ScoringTypeEnum {
  Score = 0,
  Accuracy = 1,
  Combo = 2,
  'Score V2' = 3
}

/**
 * Documentation: {@link https://osujs.mario564.com/references/team-type-enum}
 */
export enum TeamTypeEnum {
  'Head To Head' = 0,
  'Tag Co-Op' = 1,
  'Team VS' = 2,
  'Tag Team VS' = 3
}

/**
 * Documentation: {@link https://osujs.mario564.com/references/team-color-enum}
 */
export enum TeamColorEnum {
  Blue = 1,
  Red = 2
}

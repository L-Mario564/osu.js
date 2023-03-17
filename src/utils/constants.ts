import { GameMode } from '../types';

/**
 * URL builder
 */
export const buildUrl = {
  /**
   * Create a custom URL using the ppy.sh domain as a base
   * @param path Path to set after `https://{subdomain}.ppy.sh/`
   * @param subdomain Specify a subdomain to point to, defaults to `osu`
   */
  custom: createUrl,
  beatmapsetCover: (beatmapsetId: number) =>
    createUrl(`beatmaps/${beatmapsetId}/covers/cover.jpg`, 'assets'),
  beatmapsetThumbnail: (beatmapsetId: number) => createUrl(`thumb/${beatmapsetId}.jpg`, 'b'),
  beatmap: (beatmapId: number) => createUrl(`b/${beatmapId}`),
  beatmapset: (beatmapsetId: number) => createUrl(`s/${beatmapsetId}`),
  userAvatar: (userId: number) => createUrl(`a/${userId}`, 's'),
  user: (userId: number) => createUrl(`u/${userId}`),
  score: (gamemode: GameMode, scoreId: number) => createUrl(`scores/${gamemode}/${scoreId}`),
  forum: (forumId: number) => createUrl(`community/forums/${forumId}`),
  forumTopic: (topicId: number) => createUrl(`community/forums/${topicId}`),
  room: (roomId: number) => createUrl(`multiplayer/rooms/${roomId}`),
  match: (matchId: number) => createUrl(`mp/${matchId}`)
};

function createUrl(path: string, subdomain?: string) {
  let baseUrl: string = 'https://osu.ppy.sh/';

  if (subdomain) {
    baseUrl = baseUrl.replace('osu', subdomain);
  }

  return `${baseUrl}/${path}`;
}

/**
 * Score accuracy calculator
 */
export const calcAccuracy = {
  /**
   * Calculate accuracy for osu! standard
   * @param c300 300s
   * @param c100 100s
   * @param c50 50s
   * @param misses Misses
   */
  osu: (c300: number, c100: number, c50: number, misses: number) => {
    return (6 * c300 + 2 * c100 + c50) / (6 * (c300 + c100 + c50 + misses));
  },
  /**
   * Calculate accuracy for osu! taiko
   * @param geki Greats
   * @param katu Goods
   * @param misses Misses
   */
  taiko: (geki: number, katu: number, misses: number) => {
    return (2 * geki + katu) / (2 * (geki + katu + misses));
  },
  /**
   * Calculate accuracy for osu! catch
   * @param c300 Fruits caught
   * @param c100 Caught drops
   * @param c50 Caught droplets
   * @param katu Drops
   * @param misses Droplets
   */
  fruits: (c300: number, c100: number, c50: number, katu: number, misses: number) => {
    let x: number = c300 + c100 + c50;
    return x / (x + katu + misses);
  },
  /**
   * Calculate accuracy for osu! mania
   * @param geki Maxes
   * @param c300 300s
   * @param katu 200s
   * @param c100 100s
   * @param c50 50s
   * @param misses Misses
   * @param scoreV2 Apply score V2 formula?
   */
  mania: (
    geki: number,
    c300: number,
    katu: number,
    c100: number,
    c50: number,
    misses: number,
    scoreV2?: boolean
  ) => {
    let x: number = scoreV2 ? 305 * geki + 300 * c300 : 300 * (geki + c300);
    let y: number = scoreV2 ? 305 : 300;
    return (
      (x + 200 * katu + 100 * c100 + 50 * c50) / (y * (geki + c300 + katu + c100 + c50 + misses))
    );
  }
};

/**
 * Beatmap stat calculator based on mods
 */
export const calcModStat = {
  hr: {
    cs: (n: number) => n * 1.3,
    od: hrStat,
    ar: hrStat,
    hp: hrStat
  },
  dt: {
    od: (n: number) => (53 + 8 * n) / 12,
    bpm: (n: number) => n * 1.5,
    ar: (n: number) => Math.min(n <= 5 ? (75 + 8 * n) / 15 : (13 + 2 * n) / 3, 11),
    length: (n: number) => n / 1.5
  },
  ez: {
    cs: ezStat,
    od: ezStat,
    ar: ezStat,
    hp: ezStat
  },
  ht: {
    od: (n: number) => (-53 + 16 * n) / 12,
    bpm: (n: number) => n * 0.75,
    ar: (n: number) =>
      n <= 5 ? (4 / 3) * n - 5 : n > 7 ? (4 / 3) * n - 13 / 3 : (4 / 3) * n - 19 / 3,
    length: (n: number) => n * 0.75
  }
};

function hrStat(n: number): number {
  return Math.min(n * 1.4, 10);
}

function ezStat(n: number): number {
  return n / 2;
}

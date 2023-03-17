import { z } from 'zod';
import { gameModeSchema, modsSchema } from '.';

export const lookupBeatmapOptionsSchema = z
  .object({
    query: z.object({
      /** A beatmap checksum */
      checksum: z.string(),
      /** A beatmap file name */
      filename: z.string(),
      /** ID of a beatmap */
      id: z.number()
    })
  })
  .deepPartial();

export const getBeatmapScoresOptionSchema = z
  .object({
    query: z.object({
      /** Gamemode of the scores to return */
      mode: gameModeSchema
    })
  })
  .deepPartial();

export const getBeatmapsOptionsSchema = z
  .object({
    query: z.object({
      /** An array of beatmap IDs (can only take up to 50 IDs) */
      ids: z.number().array().max(50)
    })
  })
  .deepPartial();

export const getBeatmapOptionsSchema = z
  .object({
    query: z.object({
      /** A beatmap ID */
      id: z.number()
    })
  })
  .deepPartial();

export const getBeatmapAttributesOptionsSchema = z
  .object({
    body: z.object({
      /** Mods to apply (can be either the bitwise representation or an array of acronyms) */
      mods: z.union([z.number(), modsSchema])
    })
  })
  .deepPartial();

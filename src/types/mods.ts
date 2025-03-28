type BaseMod<
  TAcronym extends string,
  TSettings extends Record<string, any> | undefined = undefined
> = TSettings extends undefined
  ? {
      acronym: TAcronym;
    }
  : {
      acronym: TAcronym;
      settings?: TSettings;
    };

export type EasyMod = BaseMod<
  'EZ',
  {
    retries: number;
  }
>;

export type NoFailMod = BaseMod<'NF'>;

export type HalfTimeMod = BaseMod<
  'HT',
  {
    speed_change: number;
    adjust_pitch: boolean;
  }
>;

export type DaycoreMod = BaseMod<
  'DC',
  {
    speed_change: number;
  }
>;

export type HardRockMod = BaseMod<'HR'>;

export type SuddenDeathMod = BaseMod<
  'SD',
  {
    restart: boolean;
  }
>;

export type PerfectMod = BaseMod<
  'PF',
  {
    restart: boolean;
  }
>;

export type DoubleTimeMod = BaseMod<
  'DT',
  {
    speed_change: number;
    adjust_pitch: boolean;
  }
>;

export type NightcoreMod = BaseMod<
  'NC',
  {
    speed_change: number;
  }
>;

export type HiddenMod = BaseMod<
  'HD',
  {
    only_fade_approach_circles: boolean;
  }
>;

export type FlaslightMod = BaseMod<
  'FL',
  {
    follow_delay: number;
    size_multiplier: number;
    combo_based_size: boolean;
  }
>;

export type BlindsMod = BaseMod<'BL'>;

export type StrictTrackingMod = BaseMod<'ST'>;

export type AccuracyChallengeMod = BaseMod<
  'AC',
  {
    minimum_accuracy: number;
    accuracy_judge_mode: string;
    restart: boolean;
  }
>;

export type TargetPracticeMod = BaseMod<
  'TP',
  {
    seed: number;
    metronome: boolean;
  }
>;

export type DifficultyAdjustMod = BaseMod<
  'DA',
  {
    circle_size: number;
    approach_rate: number;
    drain_rate: number;
    overall_difficulty: number;
    extended_limits: boolean;
  }
>;

export type ClassicMod = BaseMod<
  'CL',
  {
    no_slider_head_accuracy: boolean;
    classic_note_lock: boolean;
    always_play_tail_sample: boolean;
    fade_hit_circle_early: boolean;
    classic_health: boolean;
  }
>;

export type RandomMod = BaseMod<
  'RD',
  {
    angle_sharpness: number;
    seed: number;
  }
>;

export type MirrorMod = BaseMod<
  'MR',
  {
    reflection: string;
  }
>;

export type AlternateMod = BaseMod<'AL'>;

export type SingleTapMod = BaseMod<'SG'>;

export type AutoplayMod = BaseMod<'AT'>;

export type CinemaMod = BaseMod<'CN'>;

export type RelaxMod = BaseMod<'RX'>;

export type AutopilotMod = BaseMod<'AP'>;

export type SpunOutMod = BaseMod<'SO'>;

export type TransformMod = BaseMod<'TR'>;

export type WiggleMod = BaseMod<
  'WG',
  {
    strength: number;
  }
>;

export type SpinInMod = BaseMod<'SI'>;

export type GrowMod = BaseMod<
  'GR',
  {
    start_scale: number;
  }
>;

export type DeflateMod = BaseMod<
  'DF',
  {
    start_scale: number;
  }
>;

export type WindUpMod = BaseMod<
  'WU',
  {
    initial_rate: number;
    final_rate: number;
    adjust_pitch: boolean;
  }
>;

export type WindDownMod = BaseMod<
  'WD',
  {
    initial_rate: number;
    final_rate: number;
    adjust_pitch: boolean;
  }
>;

export type TraceableMod = BaseMod<'TC'>;

export type BarrelRollMod = BaseMod<
  'BR',
  {
    spin_speed: number;
    direction: string;
  }
>;

export type ApproachDifferentMod = BaseMod<
  'AD',
  {
    scale: number;
    style: string;
  }
>;

export type MutedMod = BaseMod<
  'MU',
  {
    inverse_muting: boolean;
    enable_metronome: boolean;
    mute_combo_count: number;
    affects_hit_sounds: boolean;
  }
>;

export type NoScopeMod = BaseMod<
  'NS',
  {
    hidden_combo_count: number;
  }
>;

export type MagnetisedMod = BaseMod<
  'MG',
  {
    attraction_strength: number;
  }
>;

export type RepelMod = BaseMod<
  'RP',
  {
    repulsion_strength: number;
  }
>;

export type AdaptiveSpeedMod = BaseMod<
  'AS',
  {
    initial_rate: number;
    adjust_pitch: boolean;
  }
>;

export type FreezeFrameMod = BaseMod<'FR'>;

export type BubblesMod = BaseMod<'BU'>;

export type SynesthesiaMod = BaseMod<'SY'>;

export type DepthMod = BaseMod<
  'DP',
  {
    max_depth: number;
    show_approach_circles: boolean;
  }
>;

export type TouchDeviceMod = BaseMod<'TD'>;

export type ScoreV2Mod = BaseMod<'SV2'>;

export type SwapMod = BaseMod<'SW'>;

export type FloatingFruitsMod = BaseMod<'FF'>;

export type FadeInMod = BaseMod<
  'FI',
  {
    coverage: number;
  }
>;

export type DualStagesMod = BaseMod<'DS'>;

export type InvertMod = BaseMod<'IN'>;

export type ConstantSpeedMod = BaseMod<'CS'>;

export type HoldOffMod = BaseMod<'HO'>;

export type Key1Mod = BaseMod<'1K'>;

export type Key2Mod = BaseMod<'2K'>;

export type Key3Mod = BaseMod<'3K'>;

export type Key4Mod = BaseMod<'4K'>;

export type Key5Mod = BaseMod<'5K'>;

export type Key6Mod = BaseMod<'6K'>;

export type Key7Mod = BaseMod<'7K'>;

export type Key8Mod = BaseMod<'8K'>;

export type Key9Mod = BaseMod<'9K'>;

export type Key10Mod = BaseMod<'10K'>;

export type ModSettings =
  | EasyMod
  | NoFailMod
  | HalfTimeMod
  | DaycoreMod
  | HardRockMod
  | SuddenDeathMod
  | PerfectMod
  | DoubleTimeMod
  | NightcoreMod
  | HiddenMod
  | FlaslightMod
  | BlindsMod
  | StrictTrackingMod
  | AccuracyChallengeMod
  | TargetPracticeMod
  | DifficultyAdjustMod
  | ClassicMod
  | RandomMod
  | MirrorMod
  | AlternateMod
  | SingleTapMod
  | AutoplayMod
  | CinemaMod
  | RelaxMod
  | AutopilotMod
  | SpunOutMod
  | TransformMod
  | WiggleMod
  | SpinInMod
  | GrowMod
  | DeflateMod
  | WindUpMod
  | WindDownMod
  | TraceableMod
  | BarrelRollMod
  | ApproachDifferentMod
  | MutedMod
  | NoScopeMod
  | MagnetisedMod
  | RepelMod
  | AdaptiveSpeedMod
  | FreezeFrameMod
  | BubblesMod
  | SynesthesiaMod
  | DepthMod
  | TouchDeviceMod
  | ScoreV2Mod
  | SwapMod
  | FloatingFruitsMod
  | FadeInMod
  | DualStagesMod
  | InvertMod
  | ConstantSpeedMod
  | HoldOffMod
  | Key1Mod
  | Key2Mod
  | Key3Mod
  | Key4Mod
  | Key5Mod
  | Key6Mod
  | Key7Mod
  | Key8Mod
  | Key9Mod
  | Key10Mod;

import { getModsEnum, getEnumMods } from '../..';
import { describe, expect, it } from 'vitest';

describe('Test mod-enum conversion', () => {
  it('(Mod -> Enum) 0 mods', () => expect(getEnumMods(0)).toStrictEqual([]));
  it('(Mod -> Enum) 1 mod', () => expect(getEnumMods(8)).toStrictEqual(['HD']));
  it('(Mod -> Enum) 2 mods', () => expect(getEnumMods(24)).toStrictEqual(['HD', 'HR']));
  it('(Mod -> Enum) 3 mods', () => expect(getEnumMods(88)).toStrictEqual(['HD', 'HR', 'DT']));

  it('(Mod -> Enum) NC', () => expect(getEnumMods(576)).toStrictEqual(['NC']));
  it('(Mod -> Enum) NC + 1 mod', () => expect(getEnumMods(584)).toStrictEqual(['HD', 'NC']));
  it('(Mod -> Enum) PF', () => expect(getEnumMods(16416)).toStrictEqual(['PF']));
  it('(Mod -> Enum) PF + 1 mod', () => expect(getEnumMods(16424)).toStrictEqual(['HD', 'PF']));

  it('(Enum -> Mod) 0 mods', () => expect(getModsEnum([])).toBe(0));
  it('(Enum -> Mod) 1 mod', () => expect(getModsEnum(['HR'])).toBe(16));
  it('(Enum -> Mod) 2 mods', () => expect(getModsEnum(['HR', 'SD'])).toBe(48));
  it('(Enum -> Mod) 3 mods', () => expect(getModsEnum(['HR', 'SD', 'FL'])).toBe(1072));
  
  it('(Enum -> Mod) NC', () => expect(getModsEnum(['NC'])).toStrictEqual(512));
  it('(Enum -> Mod) PF', () => expect(getModsEnum(['PF'])).toStrictEqual(16384));

  it('(Enum -> Mod) Non-legacy mod', () => expect(getModsEnum(['DC'])).toBe(0));
  it('(Enum -> Mod) 2 non-legacy mod', () => expect(getModsEnum(['DC', '10K'])).toBe(0));
});

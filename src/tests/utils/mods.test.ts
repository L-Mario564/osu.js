import { getModsEnum, getEnumMods } from '../..';
import { describe, expect, it } from 'vitest';

describe('Test mod-enum conversion', () => {
  it('(Mod -> Enum) 0 mods', () => expect(getEnumMods(0)).toStrictEqual([]));
  it('(Mod -> Enum) 1 mod', () => expect(getEnumMods(8)).toStrictEqual(['HD']));
  it('(Mod -> Enum) 2 mods', () => expect(getEnumMods(24)).toStrictEqual(['HD', 'HR']));
  it('(Mod -> Enum) 3 mods', () => expect(getEnumMods(88)).toStrictEqual(['HD', 'HR', 'DT']));

  it('(Mod -> Enum) NC', () => expect(getEnumMods(576)).toStrictEqual(['NC']));
  it('(Mod -> Enum) PF', () => expect(getEnumMods(16416)).toStrictEqual(['PF']));
  it('(Mod -> Enum) NCPF', () => expect(getEnumMods(16992)).toStrictEqual(['NC', 'PF']));
  it('(Mod -> Enum) NC + 1 mod', () => expect(getEnumMods(584)).toStrictEqual(['HD', 'NC']));
  it('(Mod -> Enum) PF + 1 mod', () => expect(getEnumMods(16424)).toStrictEqual(['HD', 'PF']));
  it('(Mod -> Enum) NCPF + 1 mod', () => {
    expect(getEnumMods(17000)).toStrictEqual(['HD', 'NC', 'PF']);
  });

  it('(Enum -> Mod) 0 mods', () => expect(getModsEnum([])).toBe(0));
  it('(Enum -> Mod) 1 mod', () => expect(getModsEnum(['HR'])).toBe(16));
  it('(Enum -> Mod) 2 mods', () => expect(getModsEnum(['HR', 'SD'])).toBe(48));
  it('(Enum -> Mod) 3 mods', () => expect(getModsEnum(['HR', 'SD', 'FL'])).toBe(1072));

  it('(Enum -> Mod) NC', () => expect(getModsEnum(['NC'])).toStrictEqual(512));
  it('(Enum -> Mod) PF', () => expect(getModsEnum(['PF'])).toStrictEqual(16384));
  it('(Enum -> Mod) NCPF', () => expect(getModsEnum(['NC', 'PF'])).toStrictEqual(16896));
  it('(Enum -> Mod) NC + 1 mod', () => expect(getModsEnum(['HD', 'NC'])).toStrictEqual(520));
  it('(Enum -> Mod) PF + 1 mod', () => expect(getModsEnum(['HD', 'PF'])).toStrictEqual(16392));
  it('(Enum -> Mod) NCPF + 1 mod', () => {
    expect(getModsEnum(['HD', 'NC', 'PF'])).toStrictEqual(16904);
  });

  it('(Enum -> Mod) (DT)NC', () => expect(getModsEnum(['NC'], true)).toStrictEqual(576));
  it('(Enum -> Mod) (SD)PF', () => expect(getModsEnum(['PF'], true)).toStrictEqual(16416));
  it('(Enum -> Mod) (DT)NC + 1 mod', () => {
    expect(getModsEnum(['HD', 'NC'], true)).toStrictEqual(584);
  });
  it('(Enum -> Mod) (SD)PF + 1 mod', () => {
    expect(getModsEnum(['HD', 'PF'], true)).toStrictEqual(16424);
  });
  it('(Enum -> Mod) (DT)NC(SD)PF', () => {
    expect(getModsEnum(['NC', 'PF'], true)).toStrictEqual(16992);
  });
  it('(Enum -> Mod) (DT)NC(SD)PF + 1 mod', () => {
    expect(getModsEnum(['HD', 'NC', 'PF'], true)).toStrictEqual(17000);
  });

  it('(Enum -> Mod) Non-legacy mod', () => expect(getModsEnum(['DC'])).toBe(0));
  it('(Enum -> Mod) 2 non-legacy mod', () => expect(getModsEnum(['DC', '10K'])).toBe(0));
});

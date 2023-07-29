export type Sections<T extends string> = Record<T, SectionLink[]>;

export interface SectionLink {
  label: string;
  href: string;
}

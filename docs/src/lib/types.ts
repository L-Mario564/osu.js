export type Sections<T extends string> = Record<T, {
  label: string;
  href: string;
}[]>;

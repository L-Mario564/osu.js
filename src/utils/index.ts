export function formatUrlParams(urlParams: Record<string, unknown>): string {
  return Object.entries(urlParams).reduce((prev: string, [key, value]) => {
    if (!value) return prev;

    return Array.isArray(value)
      ? `${prev}${value.reduce((prev: string, value) => `${prev}&${key}[]=${value}`, '')}`
      : `${prev}&${key}=${value}`;
  }, '');
}

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

  if (Array.isArray(value) && typeof value[0] === 'object') {
    newValue = value.map((v) => map(v));
  } else if (typeof value === 'object' && value) {
    newValue = map(value as Record<string, unknown>);
  } else if (!isNaN(Number(value)) && typeof value !== 'boolean') {
    newValue = Number(value);
  }

  return [key, newValue];
}

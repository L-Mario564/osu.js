export function sleep(ms: number): Promise<unknown> {
  return new Promise((resolve: (value: unknown) => unknown) => setTimeout(resolve, ms));
}
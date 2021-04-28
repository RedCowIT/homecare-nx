export function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomArrayItem<T>(array: T[]): T {

  if (!array || array.length === 0)
    throw new Error('Empty array');

  const i = randomIntFromInterval(0, array.length - 1);

  return array[i];
}

export function guid(): string {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}

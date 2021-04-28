export const isNumber = (n: string | number): boolean =>
  !isNaN(parseFloat(String(n))) && isFinite(Number(n));

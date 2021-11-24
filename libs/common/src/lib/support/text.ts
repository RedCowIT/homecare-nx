export function toTitleCase(str: string): string {

  if (!str) {
    return str;
  }

  return str.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")
}

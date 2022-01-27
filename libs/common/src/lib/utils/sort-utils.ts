/**
 * @example sortComparer: createStringKeyComparer('full_name')
 * @param key
 */
export function createStringKeyComparer(key: string): (a: any, b: any) => number {

  return (obj1: any, obj2: any) => {
    if (!obj1[key]) {
      if (obj2[key]) {
        return -1;
      }
    }

    if (!obj2[key]) {
      if (obj1[key]) {
        return 1;
      }
    }

    return obj1[key].localeCompare(obj2[key]);
  }
}

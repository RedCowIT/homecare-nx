/**
 * @example sortComparer: createStringKeyComparer('full_name')
 * @param key
 */
import * as moment from "moment";

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

/**
 * @example sortComparer: createStringKeyComparer('date')
 * @param key
 */
export function createDateKeyComparer(key: string): (a: any, b: any) => number {

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

    return moment(obj1[key]).diff(moment(obj2[key]), "minute");
  }
}

/**
 * Group an array of objects by a field on each object
 *
 * Example:
 *
 * const result = ArrayUtils.groupBy(array, (item) => {
 *  return [item.age]
 * });
 *
 * @param items
 * @param by
 */
export function arrayGroupBy<T>(items: T[], by: any) {

  if (!items || !by) {
    return items;
  }

  return items.reduce(function (groups, item) {
    const val = by(item);
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
  }, {});
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export function arrayUnique(items: any[]) {
  if (!items) {
    return null;
  }
  return items.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
}

export function groupById<T>(items: T[]): any {
  return arrayGroupBy(items, (item) => {
    return [item.id];
  });
}

export function findById<T>(items: T[], id: number | string): T {
  return firstItem(findByKey(items, 'id', id));
}

export function findByKey<T>(items: T[], key: string, value: number | string | boolean): any {

  if (!items) {
    return items;
  }
  if (!key || key === '') {
    throw new Error('findByKey missing key parameter');
  }
  if (value === undefined || value === null) {
    throw new Error('findByKey missing value parameter');
  }

  return items.filter(item => {

    if (item[key] === null || item[key] === undefined) {
      return false;
    }

    // tslint:disable-next-line:triple-equals
    return item[key] == value;
  });

}

export function firstItem<T>(array: T[]): T {
  if (array && array.length > 0) {
    return array[0];
  }
  return null;
}

export function findIndexWithId(items: unknown[], id: number | string): number {
  return findIndexWithKey(items, 'id', id);
}

export function findIndexWithKey(items: unknown[], key: string, value: number | string | boolean): number {

  return items.findIndex((item => {
    return item[key] == value;
  }))

}

export function firstByKey<T>(items: T[], key: string, value: number | string | boolean): T {
  return firstItem(findByKey(items, key, value));
}

export function containsItemWithKey(items: unknown[], key: string, value: number | string | boolean): boolean {
  return !!firstByKey(items, key, value);
}

export function lastItem<T>(array: T[]): T {
  if (array && array.length > 0) {
    return array[array.length - 1];
  }
  return null;
}

export function addItem<T>(array: T[], item: T): T[] {
  array.push(item);
  return array;
}

export function removeItem<T>(array: T[], item: T): T[] {
  if (!array || array.length === 0) {
    return array;
  }
  const itemIndex = array.indexOf(item);
  if (itemIndex !== -1) {
    return removeItemAtIndex(array, itemIndex);
  }
  return array;
}

export function removeItemAtIndex<T>(array: T[], index: number): T[] {
  if (!array || array.length === 0) {
    return array;
  }
  if (index >= array.length) {
    throw new Error('Attempted to remove item with index exceeding array length');
  }
  array.splice(index, 1);
  return array;
}

export function containsString(array: string[], str: string) {
  if (!array) {
    return false;
  }
  return array.find(arrayStr => arrayStr === str) != null;
}

export function containsNumber(array: number[], num: number): boolean {
  if (!array) {
    return false;
  }
  return array.find(arrayNum => arrayNum === num) != null;
}

export function distinctArray(array: any[]) {
  if (array && array.length > 0) {
    return Array.from(new Set(array));
  }
  return array;
}

export function sortNumbers(array: number[], direction: 'asc' | 'desc' = 'asc') {
  if (!array || array.length === 0) {
    return array;
  }

  if (direction === 'asc') {
    return array.sort((n1, n2) => n1 - n2);
  } else {
    return array.sort((n1, n2) => n2 - n1);
  }
}

export function pluck(array: any[], key: string) {
  if (!array || array.length === 0) {
    return array;
  }

  return array.map(item => item[key]);
}

export function pluckIds(array: any[]): any[] {
  return pluck(array, 'id');
}

export function arrayIndexOfLowest(a: any[]) {

  if (!a || a.length === 0) {
    return -1;
  }

  let lowest = 0;
  for (let i = 1; i < a.length; i++) {
    if (a[i] < a[lowest]) lowest = i;
  }
  return lowest;
}

export function arrayIndexOfEarliestStr(a: string[]) {

  if (!a || a.length === 0) {
    return -1;
  }

  const dates = a.map(a => new Date(a));

  let earliest = 0;
  for (let i = 1; i < dates.length; i++) {
    if (dates[i] < dates[earliest]) {
      earliest = i;
    }
  }

  return earliest;
}

/**
 * Get items in a1 that are not in a2
 *
 * @param a1
 * @param a2
 */
export function arrayDiff<T>(a1: T[], a2: T[]): T[] {
  return a1.filter(item => a2.indexOf(item) < 0);
}

export function haveSameContents(a: unknown[], b: unknown[]): boolean {
  for (const v of new Set([...a, ...b])) {
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length) {
      return false;
    }
  }
  return true;
}

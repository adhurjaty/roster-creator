import { err, ok, Result } from "neverthrow"

export { }

declare global {
  interface Array<T> {
    findIndexResult(pred: (el: T) => boolean): Result<number, Error>
    removeAt(idx: number): Array<T>
    max<U>(pred: (el: T) => U | undefined | null, defaultValue: U): U
    splitDate(date: Date): { past: T[], present: T[], future: T[] }
    zip<U>(other: Array<U>): Array<[T, U]>
  }
}

Array.prototype.findIndexResult = function <T>(pred: (el: T) => boolean) {
  const idx = (this as Array<T>).findIndex(pred);
  if (idx < 0) {
    return err<number, Error>(new Error('Could not find element in array'));
  }

  return ok(idx);
}

Array.prototype.removeAt = function <T>(idx: number) {
  const arr = this as Array<T>;
  return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
}

Array.prototype.max = function <T, U>(pred: (el: T) => U | undefined | null, defaultValue: U): U {
  const arr = this as Array<T>;
  return arr.reduce((max, el) => {
    const value = pred(el) ?? defaultValue;
    return value > max ? value : max
  }, defaultValue)
}

Array.prototype.splitDate = function <T extends { date: Date }>(date: Date) {
  const arr = this as Array<T>;
  const past = [] as T[];
  const present = [] as T[];
  const future = [] as T[];

  arr.forEach(el => {
    if (date.toLocaleDateString() === el.date.toLocaleDateString()) {
      present.push(el);
      return;
    }

    if (el.date < date) {
      past.push(el);
      return;
    }

    future.push(el);
  });

  return {
    past,
    present,
    future
  };
}

Array.prototype.zip = function <T, U>(other: Array<U>) {
  const arr = this as Array<T>;

  const limit = Math.min(arr.length, other.length);

  const outArr: [T, U][] = [];

  for (let i = 0; i < limit; i++) {
    outArr.push([arr[i], other[i]]);
  }

  return outArr;
}
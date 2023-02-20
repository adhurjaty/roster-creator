import { err, ok, Result } from "neverthrow"

export { }

declare global {
  interface Array<T> {
    findIndexResult(pred: (el: T) => boolean): Result<number, Error>
    removeAt(idx: number): Array<T>
    max<U>(pred: (el: T) => U | undefined | null, defaultValue: U): U
  }
}

Array.prototype.findIndexResult = function <T,>(pred: (el: T) => boolean) {
  const idx = (this as Array<T>).findIndex(pred);
  if (idx < 0) {
    return err<number, Error>(new Error('Could not find element in array'));
  }

  return ok(idx);
}

Array.prototype.removeAt = function <T,>(idx: number) {
  const arr = this as Array<T>;
  return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
}

Array.prototype.max = function <T, U,>(pred: (el: T) => U | undefined | null, defaultValue: U): U {
  const arr = this as Array<T>;
  return arr.reduce((max, el) => {
    const value = pred(el) ?? defaultValue;
    return value > max ? value : max
  }, defaultValue)
}
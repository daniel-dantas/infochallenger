export interface IDictionary<T> {
  add(key: string, value: T): void;
  remove(key: string): void;
  containsKey(key: string): boolean;
  keys(): string[];
  values(): T[];
  any(): boolean;
}

export default class Dictionary<T> implements IDictionary<T> {
  _keys: string[] = [];
  _values: T[] = [];

  constructor(init: { key: string; value: T }[]) {
    for (let x = 0; x < init.length; x++) {
      // @ts-ignore
      this[init[x].key] = init[x].value;
      this._keys.push(init[x].key);
      this._values.push(init[x].value);
    }
  }

  static default(value: any) {
    return new Dictionary([{ key: "default", value }]);
  }

  add(key: string, value: T) {
    // @ts-ignore
    this[key] = value;
    this._keys.push(key);
    this._values.push(value);
  }

  remove(key: string) {
    const index = this._keys.indexOf(key, 0);
    this._keys.splice(index, 1);
    this._values.splice(index, 1);
    // @ts-ignore
    delete this[key];
  }

  keys(): string[] {
    return this._keys;
  }

  values(): T[] {
    return this._values;
  }

  containsKey(key: string) {
    // @ts-ignore
    if (typeof this[key] === "undefined") {
      return false;
    }

    return true;
  }

  toLookup(): IDictionary<T> {
    return this;
  }

  any(): boolean {
    return this._values.length > 0;
  }
}

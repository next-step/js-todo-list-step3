import {debounceOneFrame} from "@/utils";

let currentObserver: Function | null = null;

export type ObservableValue = undefined | null | string | number | boolean | Function | ObservableValue[];
export type Observable = Record<string, ObservableValue | Record<string, ObservableValue>>;

export const observe = (observer: Function) => {
  currentObserver = debounceOneFrame(observer);
  observer();
  currentObserver = null;
}

export const observableOfKey = (obj: any, key: string, defaultValue: any) => {
  if (!obj) return;
  const observers: Set<Function> = new Set();
  let _value = defaultValue && typeof defaultValue === 'object'
                ? observable(defaultValue)
                : defaultValue;
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      if (currentObserver) observers.add(currentObserver);
      return _value;
    },
    set(value) {
      if (JSON.stringify(value) === JSON.stringify(_value)) return;
      _value = value && typeof value === 'object'
                  ? observable(value)
                  : value;
      observers.forEach(observer => observer());
    },
  })
  return obj;
}

export const observable = (target: any): any => (
  Object.entries(target)
        .reduce((obj, [key, defaultValue]) => observableOfKey(obj, key, defaultValue), target)
)
let currentObserver: Function|null = null;

export type ObservableValue = undefined | null | string | number | boolean | Function | ObservableValue[];
export type Observable = Record<string, ObservableValue | Record<string, ObservableValue>>;

export const observe = (observer: Function) => {
  currentObserver = observer;
  observer();
  currentObserver = null;
}

export const observable = (target: Observable) =>
  Object.keys(target)
        .reduce((obj, key) => {
          const observers: Set<Function> = new Set();
          let _value = obj[key];
          Object.defineProperty(obj, key, {
            get () {
              if (currentObserver) observers.add(currentObserver);
              return _value;
            },
            set (value) {
              if (JSON.stringify(value) === JSON.stringify(_value)) return;
              _value = typeof value === 'object' ? observable(value) : value;
              observers.forEach(observer => observer());
            },
          })
          return obj;
        }, target);
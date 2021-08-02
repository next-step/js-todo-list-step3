let currentObserver = null;

const debounceFrame = callback => {
  let currentCallback = -1;
  return () => {
    cancelAnimationFrame(currentCallback);
    currentCallback = requestAnimationFrame(callback);
  };
};

export const observe = fn => {
  currentObserver = debounceFrame(fn);
  fn();
  currentObserver = null;
};

export const observable = obj => {
  const observerMap = Object.keys(obj).reduce((map, key) => {
    map[key] = new Set();
    return map;
  }, {});

  return new Proxy(obj, {
    get: (target, name) => {
      if (currentObserver) observerMap[name].add(currentObserver);
      return target[name];
    },
    set: (target, name, value) => {
      if (target[name] === value) return true;
      if (JSON.stringify(target[name]) === JSON.stringify(value)) return true;
      target[name] = value;
      observerMap[name].forEach(fn => fn());
      return true;
    },
  });
};

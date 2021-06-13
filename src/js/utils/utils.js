export const hasName = (name, list) => {
  return Object.keys(list).includes(name);
}

export const validLength = (value) => {
  return value.length > 1;
}

export const convertToPriority = {
  0: 'NONE',
  1: 'FIRST',
  2: 'SECOND'
};

export const convertToFilter = {
  active: 0,
  completed: 1,
  all : 2,
}

const rCurry = (fn) => {
  return function(a, b) {
    return arguments.length === 2 ? fn(a, b) : (b) => { return fn(b, a); };
  }
};

const getProperty = rCurry((obj, key) => {
  return obj == null ? undefined : obj[key];
});

export const getIndex = getProperty('index');

export const getId = getProperty('_id');
import redux from "./index.js";

export const dispatch = (action) => {
  return redux.dispatch(action);
};

export const getState = (obj, storeKey, key) => {
  return redux.getState(obj, storeKey, key);
};

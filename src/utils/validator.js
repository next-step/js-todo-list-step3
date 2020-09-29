export const isArray = (array) => Array.isArray(array);

export const isBoolean = (value) => typeof value === "boolean";

export const checkMoreThanOneClassContain = ($target, ...classNames) =>
  classNames.some((className) => $target.classList?.contains(className));

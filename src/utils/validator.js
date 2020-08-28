export const isArray = (array) => Array.isArray(array);

export const isBoolean = (value) => typeof value === "boolean";

export const checkMoreThanOneClassContain = ($target, ...classNames) => {
  const classList = $target.classList;
  let isContain = false;

  if (!classList) {
    return isContain;
  }

  classNames.forEach((className) => {
    if (classList.contains(className)) {
      isContain = true;
    }
  });

  return isContain;
};

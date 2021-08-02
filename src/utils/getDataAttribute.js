export function getDataAttribute(element, attribute) {
  return element.closest(`[data-${attribute}]`).getAttribute(`data-${attribute}`);
}

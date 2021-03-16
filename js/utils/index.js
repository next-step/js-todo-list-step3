export const strToHTML = (str) => {
  const $div = document.createElement("div");

  $div.innerHTML = str;
  return $div.children[0];
};

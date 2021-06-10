export const hasName = (name, list) => {
  return Object.keys(list).includes(name);
}

export const validLength = (value) => {
  return value.length > 1;
}

export const getIndex = (element) => {
  return +element.dataset['index'];
}

export const getId = (index, arr) => {
  return arr[index]['_id'];
}
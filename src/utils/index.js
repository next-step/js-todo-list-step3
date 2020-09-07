export const ONE_FRAME = 1000 / 60;

export const debounceOneFrame = callback => {
  let timer = null;
  return props => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(props), ONE_FRAME);
  }
}

export const lazyFrame = () => new Promise(resolve => setTimeout(resolve, ONE_FRAME * 10))

export const request = url => {
  return fetch(url).then(response => response.json());
}

export const requestWithJSONBody = (url, option) => {
  const headers = { 'Content-Type': 'application/json' };
  return fetch(url, { ...option, headers }).then(response => response.json());
}
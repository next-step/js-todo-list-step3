import HttpMethod from "../constants/HttpMethod";

export const ONE_FRAME = 1000 / 60;
export const debounceOneFrame = callback => {
  let timer = null;
  return props => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(props), ONE_FRAME);
  }
}

export const lazyFrame = () => new Promise(resolve => setTimeout(resolve, ONE_FRAME * 10))

export const request = (url, option) => {
  if ([HttpMethod.POST, HttpMethod.PUT, HttpMethod.PATCH].includes(option?.method)) {
    option.headers = { ...option.headers, 'Content-Type': 'application/json' }
  }
  return fetch(url, option).then(response => response.json());
}
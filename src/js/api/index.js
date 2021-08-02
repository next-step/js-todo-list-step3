import { BASE_URL, GET, POST, PUT, DELETE } from "../constant/api.js";

const request = async (url = '', options) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, options);
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } catch (error) {
    throw new Error(error);
  }
};

const options = (method, body) => {
  return {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }
}

export const http = {
  get: (url) => request(url),
  post: (url, body) => {
    return request(url, options(POST, body));
  },
  put: (url, body) => {
    return request(url, options(PUT, body));
  },
  delete: (url) => request(url, options(DELETE)),
};

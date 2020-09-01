import { METHOD } from "../constants.js";

export const request = async (url, option) => {
  try {
    const res = await fetch(url, option);
    if (res.status !== 200) {
      throw new Error(`Error status code : ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    throw Error(error.message);
  }
};

export const options = (method = METHOD.GET, body) => {
  if (body) {
    body = JSON.stringify(body);
  }
  console.log(body);
  return {
    method,
    headers: { "Content-Type": "application/json" },
    body,
  };
};

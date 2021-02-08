import { Constant } from "./constant.js";

export async function fetchJson(URL, option = {}) {
  try {
    const response = await fetch(`${Constant.serverURL}${URL}`, option);
    if (!response.ok) {
      throw new Error("fetch failed");
    }
    return await response.json();
  } catch (error) {
    alert(error);
    return {};
  }
}

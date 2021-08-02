import api from "../constant/api.js";

export default class DataController {
  constructor() {
    this._baseURL = api.baseURL;
  }
  
  get baseURL() {
    return this._baseURL;
  }

  fetching = async (url, method, body) => {
    let res;
    if (body) {
      res = await fetch(this.baseURL + url, {
        method,
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(body)
      })
    } else {
      res = await fetch(this.baseURL + url, {
        method,
      })
    }
    if (res.ok) {
      return await res.json();
    }
    throw new Error();
  }

  getData = async (url) => {
    try {
      return await this.fetching(url, 'GET');
    } catch (e) {
      throw new Error("response was not ok");
    }
  }
  postData =  async (url, body) => {
    try {
      return await this.fetching(url, 'POST', body);
    } catch (e) {
      throw new Error("response was not ok");
    }
  }
  putData = async (url, body) => {
    try {
      return await this.fetching(url, 'PUT', body);
    } catch (e) {
      throw new Error("response was not ok");
    }
  }
  deleteData = async (url) => {
    try {
      return await this.fetching(url, 'DELETE');
    } catch (e) {
      throw new Error("response was not ok");
    }
  }
}
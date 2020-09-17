import HttpMethod from "../constants/HttpMethod";

export const RestClient = class {

  #baseURL; #baseHeaders = { 'Content-Type': 'application/json' };

  constructor (baseURL) {
    this.#baseURL = baseURL;
  }

  #request (uri, option = { method: HttpMethod.GET }) {
    return fetch(`${this.#baseURL}/${uri}`, option).then(response => response.json());
  }

  #requestWithBody (uri, { headers = {}, body = {}, ...option }) {
    return fetch(`${this.#baseURL}/${uri}`, {
      ...option,
      body: JSON.stringify(body),
      headers: {
        ...this.#baseHeaders,
        ...headers
      }
    }).then(response => response.json());
  }

  get (uri) {
    return this.#request(uri);
  }

  delete (uri) {
    return this.#request(uri, { method: HttpMethod.DELETE });
  }

  post (uri, body) {
    return this.#requestWithBody(uri, { method: HttpMethod.POST, body });
  }

  put (uri, body) {
    return this.#requestWithBody(uri, { method: HttpMethod.PUT, body });
  }

  patch (uri, body) {
    return this.#requestWithBody(uri, { method: HttpMethod.PATCH, body });
  }


}
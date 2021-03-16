import { PUT, POST, GET, DELETE } from '../constants/index.js';

export default class ApiClient {
  #url;
  #options;

  constructor(url) {
    this.#url = url;
  }

  #createOptions(method, options = {}) {
    return {
      method,
      dataType: 'JSON',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };
  }

  fetchJSON(path) {
    return fetch(this.#url + path, this.#options).then((data) => data.json());
  }

  get = async (path) => {
    this.#options = this.#createOptions(GET);

    return this.fetchJSON(path);
  };

  post = (path, payload) => {
    const body = JSON.stringify(payload);
    this.#options = this.#createOptions(POST, { body });

    return this.fetchJSON(path);
  };

  put = (path, payload) => {
    const body = JSON.stringify(payload);
    this.#options = this.#createOptions(PUT, { body });

    return this.fetchJSON(path);
  };

  delete = (path) => {
    this.#options = this.#createOptions(DELETE);

    return this.fetchJSON(path);
  };
}

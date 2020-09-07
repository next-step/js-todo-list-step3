import {parseQuery} from "../utils";

export const Router = class {

  #callback;

  constructor (callback) {
    this.#callback = callback;
  }

  load () {
    this.#callback(location.pathname.split('/').pop());
  }

  push (uri) {
    const params = parseQuery(uri);
    history.pushState(params, '', uri);
    this.#callback({ params, uri});
  }


}
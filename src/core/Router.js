import {parseQuery} from "../utils";

export const Router = class {

  #callback;

  constructor (callback) {
    this.#callback = callback;
    window.onpopstate = () => {
      this.load();
    }
  }

  load () {
    const uri = location.pathname.split('/').pop();
    const params = parseQuery(uri);
    this.#callback({ params, uri });
  }

  push (uri) {
    const params = parseQuery(uri);
    this.#callback({ params, uri });
    history.pushState(params, '', uri);
  }

}
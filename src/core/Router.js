import {parseQuery} from "../utils/index.js";

export const Router = class {

  #callback; $query = {};

  constructor (callback) {
    this.#callback = callback;
    window.onpopstate = () => this.load();
  }

  load () {
    const uri = location.pathname.split('/').pop();
    this.$query = parseQuery(location.search);
    this.#callback(uri);
  }

  push (uri) {
    const query = parseQuery(uri);
    this.$query = query;
    this.#callback(uri);
    history.pushState(query, '', uri);
  }

}
export const Router = class {

  #callback;

  constructor (callback) {
    this.#callback = callback;
  }

  load () {
    this.#callback({
      data: {},
      uri: location.pathname.split('/').pop()
    });
  }

  push (data, uri) {
    history.pushState(data, '', uri);
    this.#callback({ data, uri });
  }


}
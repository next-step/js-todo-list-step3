import teamMiddleWare from "./team.js";

class MiddleWare {
  constructor() {
    this.middlewares = {};
  }
  fork(type, cb) {
    return (this.middlewares[type] = cb);
  }

  has(type) {
    return this.middlewares[type] ? true : false;
  }

  run(action) {
    return (
      this.middlewares[action.type] && this.middlewares[action.type](action)
    );
  }
}

const middleWare = new MiddleWare();

export const fork = (type, cb) => {
  return middleWare.fork(type, cb);
};

teamMiddleWare();

export default middleWare;

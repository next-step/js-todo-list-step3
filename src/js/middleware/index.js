import teamMiddleWare from "./team.js";
import todoMiddleWare from "./todo.js";

class MiddleWare {
  constructor() {
    this.middlewares = {};
  }
  fork(type, cb) {
    return (this.middlewares[type] = cb);
  }

  has(type) {
    return !!this.middlewares[type];
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
todoMiddleWare();

export default middleWare;

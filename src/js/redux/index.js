import middleWare from "../middleware/index.js";

class Store {
  constructor(reducer) {
    this.state = {};
    this.reducer = reducer;
    this.subscribers = [];
  }

  dispatch(action) {
    if (middleWare.has(action.type)) {
      return middleWare.run(action);
    }
    const state = this.reducer(this.state, action);
    if (JSON.stringify(state) !== JSON.stringify(this.state)) {
      this.state = state;
      this.mutate();
    }
  }

  useState(obj, key) {
    try {
      this.subscribe(obj);
      return this.state[key];
    } catch (error) {
      throw "존재하지 않는 프로퍼티에요";
    }
  }

  subscribe(obj) {
    this.subscribers.push(obj);
  }

  mutate() {
    this.subscribers.map((obj) => obj.update());
  }
}

class Redux {
  constructor() {
    this.stores = [];
  }

  dispatch(action) {
    this.stores.map((store) => store.dispatch(action));
  }

  createStore(reducer) {
    this.stores.push(new Store(reducer));
  }
}

console.log(middleWare);
const redux = new Redux();

export default redux;

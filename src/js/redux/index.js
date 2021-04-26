import middleWare from "../middleware/index.js";

class Store {
  constructor(key, reducer) {
    this.key = key;
    this.state = {};
    this.reducer = reducer;
    this.subscribers = [...new Set()];
  }

  dispatch(action) {
    console.log(action);
    const state = this.reducer(this.state, action);
    if (state !== this.state) {
      this.state = state;
      this.mutate();
    }
    if (middleWare.has(action.type)) {
      return middleWare.run(action);
    }
  }

  getState(obj, key) {
    try {
      this.subscribe(obj);
      return key ? this.state[key] : this.state;
    } catch (error) {
      throw "존재하지 않는 프로퍼티";
    }
  }

  subscribe(obj) {
    this.subscribers.push(obj);
  }

  mutate() {
    console.log("안녕");
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

  getState(obj, storeKey, key) {
    const index = this.stores.findIndex((store) => store.key === storeKey);
    if (index === -1) throw "존재하지 않는 스토어입니다.";
    return this.stores[index].getState(obj, key);
  }

  createStore(key, reducer) {
    const existedCheck = this.stores.findIndex((store) => store.key === key);
    if (existedCheck !== -1) {
      throw "이미 존재하는 key 값입니다.";
    }
    this.stores.push(new Store(key, reducer));
  }
}

const redux = new Redux();

export default redux;

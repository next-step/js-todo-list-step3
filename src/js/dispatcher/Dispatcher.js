const _storeCallBacks = [];
const _stores = [];
// eslint-disable-next-line no-unused-vars
let _promises = [];
export class Dispatcher {
  register(storeCallBack, store) {
    _storeCallBacks.push(storeCallBack);
    _stores.push(store);
    return _storeCallBacks.length - 1;
  }
  async dispatch(action) {
    var resolves = [];
    var rejects = [];
    _promises = _storeCallBacks.map((_, i) => {
      return new Promise((resolve, reject) => {
        resolves[i] = resolve;
        rejects[i] = reject;
      });
    });

    for (let i = 0; i < _storeCallBacks.length; i++) {
      Promise.resolve(await _storeCallBacks[i].bind(_stores[i])(action)).then(() => resolves[i](action));
    }
    _promises = [];
  }
}

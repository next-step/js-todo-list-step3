export function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);
  const finalReducers = {};
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  const finalReducerKeys = Object.keys(finalReducers);

  return function combination(state = {}, action) {
    let hasChanged = false;
    const nextState = {};
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

export function createStore(reducer) {
  // 상태 저장 변수 선언
  let state;

  // 구독자 저장 리스트 선언
  const listeners = [];
  // 상태 반환 함수
  const getState = () => ({ ...state });

  // 상태 업데이트 함수
  const dispatch = (action) => {
    state = reducer(state, action);
    publish();
  };

  // 출판 함수
  const publish = () => {
    listeners.forEach(({ subscriber, context }) => {
      subscriber.call(context);
    });
  };
    // 구독 함수
  const subscribe = (subscriber, context = null) => {
    listeners.push({
      subscriber,
      context,
    });
  };
  return {
    getState,
    dispatch,
    subscribe,
  };
}

export function createAction(type, payload = {}) {
  return {
    type,
    payload: { ...payload },
  };
}

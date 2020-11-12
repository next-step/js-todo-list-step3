export const useState = (initVal = undefined) => {
  let _state = initVal;
  const observable = new Set();

  const state = (render = null) => {
    if (render) observable.add(render);
    return _state;
  };

  const setState = (newValue) => {
    _state = newValue;
    render();
  };

  const render = () => {
    observable.forEach(render => render());
  };
  return [state, setState];
};


export const useFamily = (key) => {
  let family;
  const observable = new Set();

  const render = () => {
    observable.forEach(render => render());
  };

  const setFamily = (arr = []) => {
    const newFamily = new Map();
    arr.forEach((obj) => {
      const [getState, setState] = useState(obj);
      newFamily.set(obj[key], [getAtom(getState), setAtom(setState)]);
    });
    family = newFamily;
    render();
  };

  const getFamily = (render) => {
    if (render) observable.add(render);
    return family;
  };

  const getAtom = (getState) => getState;

  const setAtom = (setState) => setState;

  return [getFamily, setFamily];
};


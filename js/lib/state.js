export const useState = (initVal = undefined) => {
  let _state = initVal;
  const observable = new Set();

  const state = (render) => {
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
      const [getAtom, setAtom] = useState(obj);
      newFamily.set(obj[key], [getAtom, setAtom]);
    });
    family = newFamily;
    render();
  };

  const getFamily = (render) => {
    if (render) observable.add(render);
    return family;
  };

  const getAtom = (key, render = null) => {
    const [get] = family[key];
    return get(render);
  };

  const setAtom = (key, newValue) => {
    const [, set] = family[key];
    set(newValue);
  };

  return [getFamily, setFamily, getAtom, setAtom];
};


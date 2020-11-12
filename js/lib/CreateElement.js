// https://www.jackherrington.com/jsx-for-vanilla-js/
const CreateElement = (name, props = {}, ...children) => {
  const elem = document.createElement(name);

  Object.keys(props).forEach((key) => {
    if (['style', 'dataset'].includes(key)) {
      Object.keys(props[key]).forEach((k) => {
        elem[key][k] = props[key][k];
      });
    } else {
      elem[key] = props[key];
    }
  });

  const addChild = (child) => {
    if (Array.isArray(child)) {
      child.forEach(c => addChild(c));
    } else if (typeof child === 'object') {
      elem.appendChild(child);
    } else {
      elem.appendChild(document.createTextNode(child));
    }
  };

  (children || []).forEach(child => addChild(child));

  return elem;
};

export default CreateElement;

export const ONE_FRAME = 1000 / 60;

export const debounceOneFrame = callback => {
  let timer = null;
  return props => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(props), ONE_FRAME);
  }
}

export const lazyFrame = () => new Promise(resolve => setTimeout(resolve, ONE_FRAME * 10))

export const addEventBubblingListener = (parent, childSelector, eventType, callback) => {
  const isTarget = target => [ ...parent.querySelectorAll(childSelector) ].includes(target) ||
                             target.closest(childSelector);
  parent.addEventListener(eventType, event => {
    if (!isTarget(event.target)) return;
    callback(event);
  })
}

export const parseQuery = uri => {
  const queryString = uri.split('?')[1] || '';
  return queryString.split('&').reduce((query, str) => {
    const [key, value] = str.split("=");
    if (key && value) query[key] = value;
    return query;
  }, {});
}
export const ONE_FRAME = 1000 / 60;

export const debounceOneFrame = callback => {
  let timer = null;
  return props => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(props), ONE_FRAME);
  }
}

export const lazyFrame = () => new Promise(resolve => setTimeout(resolve, ONE_FRAME * 10))

export const addEventBubblingListener = (parent, ref, eventType, callback) => {
  const isTarget = target => [ ...parent.querySelectorAll(`[data-ref="${ref}"]`) ].includes(target);
  parent.addEventListener(eventType, event => {
    if (!isTarget(event.target)) return;
    callback(event);
  })
}
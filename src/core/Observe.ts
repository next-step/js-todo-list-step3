let currentObserver: Function|null = null;

export const observe = (observer: Function) => {
  currentObserver = observer;
  observer();
  currentObserver = null;
}
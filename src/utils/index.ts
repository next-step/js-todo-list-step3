import {RequestQuery} from "@/domains";
import {ONE_FRAME} from "@/constants";

export const debounceOneFrame = (callback: Function) => {
  let timer: number = -1;
  return (props?: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(props), ONE_FRAME);
  }
}

export const lazyFrame = (): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ONE_FRAME * 10))

export const addEventBubblingListener = (
  parent: HTMLElement,
  childSelector: string,
  eventType: string,
  callback: (event: Event) => void
) => {
  const isTarget = (target: HTMLElement) => [ ...parent.querySelectorAll(childSelector) ].includes(target) ||
                                            target.closest(childSelector);
  parent.addEventListener(eventType, event => {
    if (!isTarget(event.target as HTMLElement)) return;
    callback(event);
  })
}

export const parseQuery = (uri: string) => {
  const queryString = uri.split('?')[1] || '';
  return queryString.split('&').reduce((query: RequestQuery, str) => {
    const [key, value] = str.split("=");
    if (key && value) query[key] = value;
    return query;
  }, {});
}

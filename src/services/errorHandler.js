import { store } from '..';
import hermes from './';

/**
 * @param {Function} method async callback for Request
 * @param  {[url:string, payload?: string]} params
 */
const errorHandler = async (method, ...params) => {
  try {
    const { data } = await method.apply(hermes, params);
    return data;
  } catch (error) {
    store.dispatch(createAction('ERROR', error));
  }
};

export default errorHandler;

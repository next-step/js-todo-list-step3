import { LOADING_END, LOADING_START } from './actions.js'

const loadingStart = () => {
  return {
    type: LOADING_START,
    payload: {
      loading: true,
    },
  }
}

const loadingEnd = () => {
  return {
    type: LOADING_END,
    payload: {
      loading: false,
    },
  }
}

export { loadingStart, loadingEnd }

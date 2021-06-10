import { LOADING_END, LOADING_START, RELOAD } from './actions.js'

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

const reload = () => {
  return {
    type: RELOAD,
  }
}

export { loadingStart, loadingEnd, reload }

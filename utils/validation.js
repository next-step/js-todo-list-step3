import { KEY_NAME } from './constants.js'

export const isEnter = (key) => {
  if (key === KEY_NAME.ENTER) {
    return true
  }
  return false
}

export const isEsc = (key) => {
  if (key === KEY_NAME.ESC) {
    return true
  }
  return false
}

export const isEmpty = (value) =>
  value === null || value === undefined || value === ''

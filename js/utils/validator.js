import { KEY } from './constant.js'

export const getType = (value) =>
  Object.prototype.toString.call(value).slice(8, -1)
export const isNull = (value) => getType(value) === 'Null'
export const isUndefined = (value) => getType(value) === 'Undefined'
export const isString = (value) => getType(value) === 'String'
export const isArray = (value) => getType(value) === 'Array'
export const isObject = (value) => getType(value) === 'Object'
export const isBoolean = (value) => getType(value) === 'Boolean'

export const isEnterKey = (e) => e.key === KEY.ENTER
export const isEscKey = (e) => e.key === KEY.ESC
export const isNumber = (v) => !!v && typeof v === 'number'
export const isNotEmptyString = (v) =>
  !!v && typeof v === 'string' && v.length > 0
export const isEmptyArray = (v) => !!v && Array.isArray(v) && v.length === 0
export const validateNewInstance = (target, origin) => {
  if (target !== origin) {
    throw new Error(`${origin.name} must be called with new`)
  }
}
export const validateElement = (target) => {
  if (!(target instanceof HTMLElement)) {
    throw new Error('HTML element must be injected')
  }
}

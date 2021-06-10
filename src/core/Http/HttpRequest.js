import HttpConnector from './HttpConnector.js'
import { Method } from '../../constant/Http.js'

const connector = new HttpConnector()

const { GET, POST, PUT, DELETE, PATCH } = Method
const get = (url) => connector.request(url, GET)
const del = (url) => connector.request(url, DELETE)
const post = (url, data) => connector.request(url, POST, data)
const put = (url, data) => connector.request(url, PUT, data)
const patch = (url, data) => connector.request(url, PATCH, data)

export default Object.freeze({
  get,
  del,
  post,
  put,
  patch,
})

import { baseURL } from '../../constant/Http.js'
import { ONE, THREE } from '../../constant/Number.js'

const SECOND = 1000

export default class HttpConnector {
  constructor() {
    this.endpoint = baseURL
  }

  async request(url, method, data) {
    const self = this
    let attempts_left = THREE

    const fetch_options = {
      headers: { 'Content-Type': 'application/json' },
      method: method,
      body: JSON.stringify(data),
    }

    const fetchRetry = async (url, options, attempt) => {
      try {
        const response = await fetch(url, options)

        if (!response.ok) {
          throw new Error('Invalid response.')
        }

        return response.json()
      } catch (error) {
        if (attempt <= 1) {
          throw error
        }
        await self.sleep(SECOND)
        return fetchRetry(url, options, attempt - ONE)
      }
    }

    return await fetchRetry(self.endpoint + url, fetch_options, attempts_left)
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

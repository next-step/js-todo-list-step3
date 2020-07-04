export const METHOD = {
  POST(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
      }),
    }
  },
  PUT(data) {
    return {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
      }),
    }
  },
  DELETE() {
    return {
      method: 'DELETE',
    }
  },
}

export const request = (url, config) => {
  console.log('[REQUEST]')
  console.log(JSON.stringify({ url, ...config }, null, 2))
  return fetch(url, config)
}
export const requestWithReturn = (url, config) =>
  request(url, config).then((response) => response.json())

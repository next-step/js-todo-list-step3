export const getURLQueryArray = (queries) => {
  if (!queries) {
    throw new Error('queries are empty')
  }
  return queries
    .slice(1, queries.length) // '?'이후 값 부터.
    .split('&')
    .map((element) => element.split('='))
    .map(([key, value]) => ({ [key]: value }))
}

export const redirectToMainPage = () => (window.location.href = '/index.html')

export const clearChildNode = (selector) => {
  const $target = document.querySelector(selector)
  $target.innerHTML = ''
}

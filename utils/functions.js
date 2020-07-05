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

export const getURLQueryArray = (quires) => {
  if (!quires) {
    throw new Error('quires are empty')
  }
  return quires
    .slice(1, quires.length)
    .split('&')
    .map((element) => element.split('='))
    .map(([key, value]) => ({ [key]: value }))
}

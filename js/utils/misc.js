export const searchParam = (key) => {
  return new URLSearchParams(location.search).get(key)
}

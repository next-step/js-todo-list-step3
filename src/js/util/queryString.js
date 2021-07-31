export const getQueryString = () => {
  const result = {};
  const url = location.href;
  const queryString = url.split('?')[1];
  queryString.split('&').forEach(str => {
    const key = str.split('=')[0];
    const value = str.split('=')[1];
    result[key] = value;
  });
  return result;
};

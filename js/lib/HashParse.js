const HashParse = (hash) => {
  const [name, query] = hash.split('?');
  const queryList = query.split('&');
  return queryList.reduce((queryObj, string) => {
    const [key, value] = string.split('=');
    queryObj[key] = value;
    return queryObj
  }, {})
};

export default HashParse;
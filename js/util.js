function httpStatusWrapper(fn) {
  return function (...args) {
    return fn(...args).then((response) => {
      if (!response.ok) {
        throw new Error(response);
      }
      return response.json();
    });
  };
}

function fetchRequest(url, method = 'GET', body) {
  const jsonBody = body ? createJsonBody(body) : {};
  return fetch(url, {
    method: method,
    ...jsonBody,
  });
}

function fetchData(url, method, body) {
  const wrappedFunction = httpStatusWrapper(() =>
    fetchRequest(url, method, body)
  );

  return wrappedFunction();
}

function createJsonBody(body) {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
}

export { fetchData };

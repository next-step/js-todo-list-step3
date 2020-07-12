const subOption = ({ method, body }) => {
  return {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body }),
  };
};

export const options = {
  POST: (body) => subOption({ method: 'POST', body }),
  DELETE: () => {
    return { method: 'DELETE' };
  },
  TOGGLE: () => {
    return { method: 'PUT' };
  },
  PUT: (body) => subOption({ method: 'PUT', body }),
};

export const request = async (url, option) => {
  try {
    const response = await fetch(url, option);
    return response.json();
  } catch (e) {
    console.error(e);
  }
};

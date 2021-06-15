export const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/';
export const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const fetchAPI = async (url = '', method = METHOD.GET, payload = {}) => {
  try {
    const option = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };

    if (method !== METHOD.GET) {
      option.body = JSON.stringify(payload);
    }

    const response = await fetch(`${BASE_URL}${url}`, option);
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

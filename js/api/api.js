'use strict';

const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/';

const option = {
  post: content => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  }),

  delete: () => ({
    method: 'DELETE',
  }),

  put: content => ({
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  }),
};

const request = async (url, option = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, option);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  } catch (err) {
    alert(err);
  }
};

export { option, request };

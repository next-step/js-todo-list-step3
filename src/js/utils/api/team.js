import { request } from '../api/index.js';
import { BASE_URL } from '../constants.js';

const option = {
  add: (name) => ({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
    }),
  }),

  delete: () => ({
    method: 'DELETE',
  }),
};

const api = {
  fetchTeamList: () => request(`${BASE_URL}/`),
  fetchTeam: (id) => request(`${BASE_URL}/${id}`),
  addTeam: (name) => request(`${BASE_URL}/`, option.add(name)),
  deleteTeam: (id) => request(`${BASE_URL}/${id}`, option.delete()),
};

export default api;

import { default as teamAPI } from './team.js';
import { default as userAPI } from './user.js';

export const request = async (url, option = {}) => {
  const response = await fetch(url, option);
  if (!response.ok) {
    throw new Error(
      `http request Error : ${response.status} : ${response.message}`,
    );
  }

  return await response.json();
};

export const api = {
  team: teamAPI,
  user: userAPI,
};

import apiTeam from './apiTeam.js';
import apiMember from './apiMember.js';

export const request = async (url, option) => {
  try {
    const response = await fetch(url, option);
    return response.json();
  } catch (e) {
    console.error(e);
  }
};

const subOption = ({ method, body: { key, value } }) => {
  return {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ [key]: value }),
  };
};

export const options = {
  POST: (key, value) => subOption({ method: 'POST', body: { key, value } }),
  DELETE: () => {
    return { method: 'DELETE' };
  },
  TOGGLE: () => {
    return { method: 'PUT' };
  },
  PUT: (key, value) => subOption({ method: 'PUT', body: { key, value } }),
  DRAGDROP_ITEM: (originMemberId, targetMemberId, newPosition) => {
    return {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        originMemberId,
        targetMemberId,
        newPosition,
      }),
    };
  },
  DRAGDROP_LIST: (memberId, newPosition) => {
    return {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        memberId,
        newPosition,
      }),
    };
  },
};

const rootApi = { ...apiTeam, ...apiMember };

export default rootApi;

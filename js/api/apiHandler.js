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

const rootApi = { ...apiTeam, ...apiMember };

export default rootApi;

import {ADDRESS} from './constants.js';

export async function getTeams() {
  const response = await fetch(`${ADDRESS.BASE_URL}/api/teams`,
    {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    });

  return await response.json();
}

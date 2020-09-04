import {ADDRESS} from './constants.js';

export async function getTeams() {
  const response = await fetch(`${ADDRESS.BASE_URL}/api/teams`,
    {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    });

  return await response.json();
}

export async function addTeam(name) {
  const response = await fetch(`${ADDRESS.BASE_URL}/api/teams`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
      }),
    });

  return await response.json();
}

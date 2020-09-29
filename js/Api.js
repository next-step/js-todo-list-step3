import {ADDRESS} from './constants.js';

export async function getTeams() {
  const response = await fetch(ADDRESS.TEAM_URL, get());
  return await response.json();
}

export async function addTeam(name) {
  const response = await fetch(ADDRESS.TEAM_URL, post({name}));
  return await response.json();
}

function post(data) {
  return {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  };
}

function get() {
  return {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };
}

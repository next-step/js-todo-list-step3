export const teamAPI = '/api/teams';

export const team = (teamId = null) => {
  let uri = teamAPI;
  if (teamId) uri += `/${teamId}`;
  return uri;
};

export const member = (teamId, memberId = null) => {
  let uri = `${teamAPI}/${teamId}/members`;
  if (memberId) uri += `${memberId}`;
  return uri;
};

export const todoItem = (teamId, memberId, itemId = null, option = { toggle: null, priority: null }) => {
  const { toggle, priority } = option;

  let uri = `${teamAPI}/${teamId}/members/${memberId}/items`;
  if (itemId) uri += `/${itemId}`;
  if (toggle) uri += '/toggle';
  if (priority) uri += '/priority';
  return uri;
};


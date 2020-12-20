export const isKanban = () => {
  return location.pathname.search('kanban') > 0;
}

export const toKanban = (teamInfo) => {
  return history.pushState(teamInfo, '', 'kanban.html');
}

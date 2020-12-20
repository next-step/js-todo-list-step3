export const isKanban = () => {
  return location.pathname.search('kanban') > 0;
}

export const toKanban = (teamId) => {
  return history.pushState({teamId}, '', 'kanban.html');
}

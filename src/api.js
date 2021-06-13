const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/teams';

export async function getTeamListData() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('유효하지 않은 URL');

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

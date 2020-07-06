const BASE_URL = 'https://blackcoffee-todolist.df.r.appspot.com/api/teams';

const responseHandler = async request => {
  // TODO: Loading 보여주기
  //   Loading.setState(true);
  const response = await request();
  if (!response.ok) {
    // 200~299 코드 확인
    throw new Error('[api] API를 확인해주세요.');
  }

  //   Loading.setState(false);
  return await response.json();
};

const fetchTeamList = async () => {
  try {
    return await responseHandler(() => fetch(`${BASE_URL}`));
  } catch (e) {
    console.error(e);
    return [];
  }
};

const addTeam = async newTeam => {
  try {
    return await responseHandler(() =>
      fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newTeam
        })
      })
    );
  } catch (e) {
    console.error(e);
  }
};

const deleteTeam = async teamId => {
  try {
    return await responseHandler(() =>
      fetch(`${BASE_URL}/${teamId}`, {
        method: 'DELETE'
      })
    );
  } catch (e) {
    console.error(e);
  }
};

const fetchTeamMember = async teamId => {
  try {
    return await responseHandler(() => fetch(`${BASE_URL}/${teamId}`));
  } catch (e) {
    console.error(e);
    return [];
  }
};

const addTeamMember = async (teamId, newMember) => {
  try {
    return await responseHandler(() =>
      fetch(`${BASE_URL}/${teamId}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newMember
        })
      })
    );
  } catch (e) {
    console.error(e);
  }
};

const fetchMemberTodoList = async (teamId, memberId) => {
  try {
    return await responseHandler(() => fetch(`${BASE_URL}/${teamId}/members/${memberId}`));
  } catch (e) {
    console.error(e);
    return [];
  }
};

const addMemberTodoItem = async (teamId, memberId, contents) => {
  try {
    return await responseHandler(() =>
      fetch(`${BASE_URL}/${teamId}/members/${memberId}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents
        })
      })
    );
  } catch (e) {
    console.error(e);
  }
};

const toggleMemberTodoItem = async (teamId, memberId, itemId) => {
  try {
    return await responseHandler(() =>
      fetch(`${BASE_URL}/${teamId}/members/${memberId}/items/${itemId}/toggle`, {
        method: 'PUT'
      })
    );
  } catch (e) {
    console.error(e);
  }
};

const editMemberTodoItem = async (teamId, memberId, itemId, contents) => {
  try {
    return await responseHandler(() =>
      fetch(`${BASE_URL}/${teamId}/members/${memberId}/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents
        })
      })
    );
  } catch (e) {
    console.error(e);
  }
};

const deleteMemberTodoItem = async (teamId, memberId, itemId) => {
  try {
    return await responseHandler(() =>
      fetch(`${BASE_URL}/${teamId}/members/${memberId}/items/${itemId}`, {
        method: 'DELETE'
      })
    );
  } catch (e) {
    console.error(e);
  }
};

const moveOrderMemberTodoItem = async (
  teamId,
  itemId,
  originMemberId,
  targetMemberId,
  newPosition
) => {
  try {
    return await responseHandler(() =>
      fetch(`${BASE_URL}/${teamId}/items/${itemId}/sort`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          originMemberId,
          targetMemberId,
          newPosition
        })
      })
    );
  } catch (e) {
    console.error(e);
  }
};

const api = {
  fetchTeamList,
  addTeam,
  deleteTeam,
  fetchTeamMember,
  addTeamMember,
  fetchMemberTodoList,
  addMemberTodoItem,
  toggleMemberTodoItem,
  editMemberTodoItem,
  deleteMemberTodoItem,
  moveOrderMemberTodoItem
};

export default api;

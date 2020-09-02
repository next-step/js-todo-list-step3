import request from "./request.js";
const BASE_URL = "https://blackcoffee-todolist.df.r.appspot.com/api/teams";

export const getTeamList = async () => {
  try {
    const teamList = await request.get(BASE_URL);

    return teamList;
  } catch (error) {
    throw Error(error.message);
  }
};

export const getTeam = async (teamId) => {
  try {
    const team = await request.get(`${BASE_URL}/${teamId}`);

    return team;
  } catch (error) {
    throw Error(error.message);
  }
};

export const addTeam = async (name) => {
  const newTeam = {
    name,
  };
  try {
    const response = await request.post(BASE_URL, newTeam);

    return response;
  } catch (error) {
    throw Error(error.message);
  }
};

export const deleteTeam = async (teamId) => {
  try {
    const response = await request.delete(`${BASE_URL}/${teamId}`);

    return response;
  } catch (error) {
    throw Error(error.message);
  }
};

export const addMember = async (teamId, name) => {
  const newMember = {
    name,
  };
  try {
    const response = await request.post(
      `${BASE_URL}/${teamId}/members`,
      newMember
    );

    return response;
  } catch (error) {
    throw Error(error.message);
  }
};

export const getMember = async (teamId, memberId) => {
  try {
    const member = await request.get(
      `${BASE_URL}/${teamId}/members/${memberId}`
    );

    return member;
  } catch (error) {
    throw Error(error.message);
  }
};

export const addTodo = async (teamId, memberId, contents) => {
  try {
    const newTodo = {
      contents,
    };
    const addedTodo = await request.post(
      `${BASE_URL}/${teamId}/members/${memberId}/items`,
      newTodo
    );

    return addedTodo;
  } catch (error) {
    throw Error(error.message);
  }
};

export const deleteTodo = async (teamId, memberId, itemId) => {
  try {
    const response = await request.delete(
      `${BASE_URL}/${teamId}/members/${memberId}/items/${itemId}`
    );

    return response;
  } catch (error) {
    throw Error(error.message);
  }
};

export const toggleTodo = async (teamId, memberId, itemId) => {
  try {
    const toggledTodo = await request.put(
      `${BASE_URL}/${teamId}/members/${memberId}/items/${itemId}/toggle`
    );

    return toggledTodo;
  } catch (error) {
    throw Error(error.message);
  }
};

export const editTodo = async (teamId, memberId, itemId, contents) => {
  try {
    const newTodo = {
      contents,
    };
    const changedTodo = await request.put(
      `${BASE_URL}/${teamId}/members/${memberId}/items/${itemId}`,
      newTodo
    );

    return changedTodo;
  } catch (error) {
    throw Error(error.message);
  }
};

export const changePriorityTodo = async (
  teamId,
  memberId,
  itemId,
  priority
) => {
  try {
    priority = parseInt(priority);
    const newPriority = {
      priority,
    };
    const changedTodo = await request.put(
      `${BASE_URL}/${teamId}/members/${memberId}/items/${itemId}/priority`,
      newPriority
    );

    return changedTodo;
  } catch (error) {
    throw Error(error.message);
  }
};

export const deleteAllTodo = async (teamId, memberId) => {
  try {
    const response = await request.delete(
      `${BASE_URL}/${teamId}/members/${memberId}/items`
    );

    return response;
  } catch (error) {
    throw Error(error.message);
  }
};

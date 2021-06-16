import CONSTANT from '../Constants/Constans.js';
import ROUTER from '../Constants/RouterURL.js';

const headers = { 'Content-Type': 'application/json' };

const options = {
  GET: { method: CONSTANT.GET },
  POST: (body) => {
    return {
      method: CONSTANT.POST,
      headers,
      body: JSON.stringify(body) ?? '',
    };
  },
  PUT: (body) => {
    return {
      method: CONSTANT.PUT,
      headers,
      body: JSON.stringify(body) ?? '',
    };
  },
  DELETE: { method: CONSTANT.DELETE },
};

const request = async (url, option) => {
  try {
    const response = await fetch(url, option);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw errorData;
    }
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};

const api = {
  getTeamList: async () => {
    try {
      const teamList = await request(ROUTER.GET_TEAM_LIST, options.GET);
      return {
        isError: false,
        data: teamList,
      };
    } catch (error) {
      return {
        isError: true,
        data: error,
      };
    }
  },

  getTeamMember: async (teamId) => {
    try {
      const teamMember = await request(
        ROUTER.GET_TEAM_MEMBER(teamId),
        options.GET
      );
      return {
        isError: false,
        data: teamMember,
      };
    } catch (error) {
      return {
        isError: true,
        data: error,
      };
    }
  },

  addTeamTodoItem: async (teamId, memberId, contents) => {
    try {
      const todoItem = await request(
        ROUTER.ADD_TEAM_TODOITEM(teamId, memberId),
        options.POST({ contents })
      );
      return {
        isError: false,
        data: todoItem,
      };
    } catch (error) {
      return {
        isError: true,
        data: error,
      };
    }
  },

  changeTeamTodoItemPriority: async (teamId, memberId, itemId, priority) => {
    try {
      const todoItem = await request(
        ROUTER.CHANGE_TEAM_TODOITEM_PRIORITY(teamId, memberId, itemId),
        options.PUT({ priority })
      );
      return {
        isError: false,
        data: todoItem,
      };
    } catch (error) {
      return {
        isError: true,
        data: error,
      };
    }
  },

  toggleTeamTodoItem: async (teamId, memberId, itemId) => {
    try {
      const todoItem = await request(
        ROUTER.TOGGLE_TEAM_TODOITEM(teamId, memberId, itemId),
        options.PUT()
      );
      return {
        isError: false,
        data: todoItem,
      };
    } catch (error) {
      return {
        isError: true,
        data: error,
      };
    }
  },

  deleteTeamTodoItem: async (teamId, memberId, itemId) => {
    try {
      const todoItem = await request(
        ROUTER.DELETE_TEAM_TODOITEM(teamId, memberId, itemId),
        options.DELETE
      );
      return {
        isError: false,
        data: todoItem,
      };
    } catch (error) {
      return {
        isError: true,
        data: error,
      };
    }
  },
  editTeamTodoItemContents: async (teamId, memberId, itemId, contents) => {
    try {
      const todoItem = await request(
        ROUTER.EDIT_TEAM_TODOITEM_CONTENTS(teamId, memberId, itemId),
        options.PUT({ contents })
      );
      return {
        isError: false,
        data: todoItem,
      };
    } catch (error) {
      return {
        isError: true,
        data: error,
      };
    }
  },

  deleteTeamTodoItemAll: async (teamId, memberId) => {
    try {
      const response = await request(
        ROUTER.DELETE_TEAM_TODOITEM_ALL(teamId, memberId),
        options.DELETE
      );
      return {
        isError: false,
        data: response,
      };
    } catch (error) {
      return {
        isError: true,
        data: error,
      };
    }
  },

  getTeamTodoList: async (teamId, memberId) => {
    try {
      const response = await request(
        ROUTER.GET_TEAM_TODOLIST(teamId, memberId),
        options.GET
      );
      return {
        isError: false,
        data: response,
      };
    } catch (error) {
      return {
        isError: true,
        data: error,
      };
    }
  },

  addTeamMember: async (teamId, name) => {
    try {
      const response = await request(
        ROUTER.ADD_TEAM_MEMBER(teamId),
        options.POST({ name })
      );
      return {
        isError: false,
        data: response,
      };
    } catch (error) {
      return {
        isError: true,
        data: error,
      };
    }
  },

  addTeam: async (name) => {
    try {
      const response = await request(ROUTER.ADD_TEAM, options.POST({ name }));
      return {
        isError: false,
        data: response,
      };
    } catch (error) {
      return {
        isError: true,
        data: error,
      };
    }
  },
};

export default api;

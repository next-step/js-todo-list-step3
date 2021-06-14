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
      const teamList = await request(`${ROUTER.GET_TEAM_LIST}`, options.GET);
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
};

export default api;

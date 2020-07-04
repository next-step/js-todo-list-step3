import { requestApi } from '../util.js';
import { METHOD } from '../constants.js';

const BASE_URL = 'https://blackcoffee-todolist.df.r.appspot.com';

const getApiOption = (method, data) => {
  const option = {
    method,
    headers: { 'Content-Type': 'application/json' }
  }
  if (data) {
    option.body = JSON.stringify(data)
  }
  return option;
}

export async function addTeam(name) {
  const url = `${BASE_URL}/api/teams`;
  const option = getApiOption(METHOD.POST, { name });
  const res = await requestApi(url, option);
  return res;
}



import { fetchRequest } from "./lib/fetchRequest.js";
import { API_URL, METHOD } from "./constants/config.js";
import { ERROR_MESSAGES } from "./constants/message.js";

import TeamList from "./components/TeamList.js";

const init = async () => {
  const { response, error } = await fetchRequest(API_URL.TEAMS, METHOD.GET);

  if (error) alert(ERROR_MESSAGES.GET_TEAM_LIST);

  new TeamList({ teamListData: response });
};

init();

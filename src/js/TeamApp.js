import { fetchRequest } from "./lib/fetchRequest.js";
import { API_URL, METHOD } from "./constants/config.js";

import TeamList from "./components/TeamList.js";

const init = async () => {
  const { response, error } = await fetchRequest(API_URL.TEAMS, METHOD.GET);

  new TeamList({ teamListData: response });
};

init();

import getParams from "./lib/getURLQueryString.js";
import { fetchRequest } from "./lib/fetchRequest.js";
import { API_URL, METHOD } from "./constants/config.js";

import Team from "./components/Team.js";

const getTeam = async () => {
  const teamId = getParams.get("id");
  const { response, error } = await fetchRequest(API_URL.TEAM(teamId), METHOD.GET);

  if (error) return alert(ERROR_MESSAGES.GET_TEAM);

  new Team({ teamData: response });
};

getTeam();

import { fetchRequest } from "../../lib/fetchRequest.js";
import { API_URL, METHOD } from "../../constants/config.js";
import { INFORM_MESSAGES, ERROR_MESSAGES } from "../../constants/message.js";

async function addTeam() {
  const teamName = prompt(INFORM_MESSAGES.ADD_TEAM);
  if (!teamName) return;

  const { response, error } = await fetchRequest(API_URL.TEAMS, METHOD.POST, { name: teamName });

  if (error) return alert(ERROR_MESSAGES.ADD_TEAM);

  this.teamListData.push(new TeamModel({ ...response, id: response._id }));
  this.render();
}

export { addTeam };

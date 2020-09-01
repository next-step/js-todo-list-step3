import { request, options } from "./request.js";
import { BASE_URL, METHOD } from "../constans.js";
import { validateInstance } from "../utils.js";

const addMember = async (teamId, name) =>
  request(
    `${BASE_URL}/api/teams/${teamId}/members`,
    options(METHOD.POST, { name })
  );

const fetchMember = async (teamId, memberId) =>
  request(`${BASE_URL}/api/teams/${teamId}/members/${memberId}`);

function memberAPI(teamId) {
  validateInstance(memberAPI, this);
  this.teamId = teamId;

  this.addMember = async (name) => addMember(this.teamId, name);

  this.fetchMemberById = async (memberId) => fetchMember(this.teamId, memberId);
}

export default memberAPI;

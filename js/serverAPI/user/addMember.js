import { fetchJson } from "../fetch.js";
import { requestOption } from "../requestOption.js";
import { tryRequest } from "../tryRequest.js";

function isValidResult(updatedTeam) {
  return updatedTeam !== undefined && updatedTeam.members.length > 0;
}

export async function addMember(teamID, memberName) {
  return await tryRequest(
    async ({ teamID, memberName }) => {
      return await fetchJson(
        `/api/teams/${teamID}/members`,
        requestOption.post({ name: memberName })
      );
    },
    { teamID: teamID, memberName: memberName },
    isValidResult,
    {},
    "Team is invalid or has empty members"
  );
}

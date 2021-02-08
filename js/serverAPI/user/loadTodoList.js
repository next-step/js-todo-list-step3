import { fetchJson } from "../fetch.js";
import { requestOption } from "../requestOption.js";
import { tryRequest } from "../tryRequest.js";

function isValidResult(userInformation, { memberID }) {
  return userInformation !== undefined && userInformation._id === memberID;
}

export async function loadTodoList(teamID, memberID) {
  return await tryRequest(
    async ({ teamID, memberID }) => {
      return await fetchJson(`/api/teams/${teamID}/members/${memberID}`);
    },
    { teamID: teamID, memberID: memberID },
    isValidResult,
    { memberID: memberID },
    "Member ID mismatch."
  );
}

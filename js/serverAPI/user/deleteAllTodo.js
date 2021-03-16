import { fetchJson } from "../fetch.js";
import { requestOption } from "../requestOption.js";
import { tryRequest } from "../tryRequest.js";

function isValidResult(response) {
  // 별다른 반환값이 없음.
  return true;
}

export async function deleteAllTodo(teamID, memberID) {
  return await tryRequest(
    async ({ teamID, memberID }) => {
      return await fetchJson(
        `/api/teams/${teamID}/members/${memberID}/items/`,
        requestOption.delete()
      );
    },
    { teamID: teamID, memberID: memberID },
    isValidResult,
    {},
    "DeleteAll operation failed."
  );
}

import { fetchJson } from "../fetch.js";
import { requestOption } from "../requestOption.js";
import { tryRequest } from "../tryRequest.js";

function isValidResult(response) {
  return response !== undefined;
}

export async function deleteTodo(teamID, memberID, itemID) {
  return await tryRequest(
    async ({ teamID, memberID, itemID }) => {
      return await fetchJson(
        `/api/teams/${teamID}/members/${memberID}/items/${itemID}`,
        requestOption.delete()
      );
    },
    { teamID: teamID, memberID: memberID, itemID: itemID },
    isValidResult,
    {},
    "Delete operation failed."
  );
}

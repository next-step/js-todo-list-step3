import { fetchJson } from "../fetch.js";
import { requestOption } from "../requestOption.js";
import { tryRequest } from "../tryRequest.js";

function isValidResult(updatedTodo, { itemID }) {
  return updatedTodo !== undefined && updatedTodo._id === itemID;
}

export async function toggleTodo(teamID, memberID, itemID) {
  return await tryRequest(
    async ({ teamID, memberID, itemID }) => {
      return await fetchJson(
        `/api/teams/${teamID}/members/${memberID}/items/${itemID}/toggle`,
        requestOption.put()
      );
    },
    { teamID: teamID, memberID: memberID, itemID: itemID },
    isValidResult,
    { itemID: itemID },
    "Todo ID mismatch."
  );
}

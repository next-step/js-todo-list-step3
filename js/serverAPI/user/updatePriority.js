import { fetchJson } from "../fetch.js";
import { requestOption } from "../requestOption.js";
import { tryRequest } from "../tryRequest.js";

function isValidResult(updatedTodo, { itemID, priority }) {
  return (
    updatedTodo !== undefined &&
    updatedTodo._id === itemID &&
    updatedTodo.priority === priority
  );
}

export async function updatePriority(teamID, memberID, itemID, priority) {
  return await tryRequest(
    async ({ teamID, memberID, itemID, priority }) => {
      return await fetchJson(
        `/api/teams/${teamID}/members/${memberID}/items/${itemID}/priority`,
        requestOption.put({ priority: priority })
      );
    },
    { teamID: teamID, memberID: memberID, itemID: itemID, priority: priority },
    isValidResult,
    { itemID: itemID, priority: priority },
    "Todo ID mismatch."
  );
}

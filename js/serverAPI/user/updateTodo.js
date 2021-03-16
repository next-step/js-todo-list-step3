import { fetchJson } from "../fetch.js";
import { requestOption } from "../requestOption.js";
import { tryRequest } from "../tryRequest.js";

function isValidResult(updatedTodo, { itemID, contents }) {
  return (
    updatedTodo !== undefined &&
    updatedTodo._id === itemID &&
    updatedTodo.contents === contents
  );
}

export async function updateTodo(teamID, memberID, itemID, contents) {
  return await tryRequest(
    async ({ teamID, memberID, itemID, contents }) => {
      return await fetchJson(
        `/api/teams/${teamID}/members/${memberID}/items/${itemID}`,
        requestOption.put({ contents: contents })
      );
    },
    { teamID: teamID, memberID: memberID, itemID: itemID, contents: contents },
    isValidResult,
    { itemID: itemID, contents: contents },
    "Todo ID mismatch."
  );
}

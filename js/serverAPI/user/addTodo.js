import { fetchJson } from "../fetch.js";
import { requestOption } from "../requestOption.js";
import { tryRequest } from "../tryRequest.js";

function isValidResult(addedTodo) {
  return addedTodo !== undefined && addedTodo._id !== undefined;
}

export async function addTodo(teamID, memberID, contents) {
  return await tryRequest(
    async ({ teamID, memberID, contents }) => {
      return await fetchJson(
        `/api/teams/${teamID}/members/${memberID}/items`,
        requestOption.post({ contents: contents })
      );
    },
    { teamID: teamID, memberID: memberID, contents: contents },
    isValidResult,
    {},
    "ID of added todo is invalid."
  );
}

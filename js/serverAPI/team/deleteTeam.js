import { fetchJson } from "../fetch.js";
import { requestOption } from "../requestOption.js";
import { tryRequest } from "../tryRequest.js";

function isValidResult(response) {
  // 삭제 옵션에는 별다른 반환값이 없음.
  return true;
}

export async function deleteTeam(teamID) {
  return await tryRequest(
    async ({ teamID }) => {
      fetchJson(`/api/teams/${teamID}`, requestOption.delete());
    },
    { teamID: teamID },
    isValidResult,
    {},
    "Delete operation result invalid."
  );
}

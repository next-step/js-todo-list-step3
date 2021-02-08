import { fetchJson } from "../fetch.js";
import { requestOption } from "../requestOption.js";
import { tryRequest } from "../tryRequest.js";

export async function loadTeam(teamID) {
  return await tryRequest(
    async ({ teamID }) => {
      return await fetchJson(`/api/teams/${teamID}`);
    },
    { teamID: teamID },
    isValidResult,
    {},
    `Team ${teamID} loading fail.`
  );
}

function isValidResult(loadedTeamInformation) {
  return loadedTeamInformation !== undefined;
}

export async function loadTeams() {
  return await tryRequest(
    async () => {
      return await fetchJson("/api/teams");
    },
    {},
    isValidResult,
    {},
    "Team loading fail."
  );
}

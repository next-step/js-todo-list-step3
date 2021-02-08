import { fetchJson } from "../fetch.js";
import { requestOption } from "../requestOption.js";
import { tryRequest } from "../tryRequest.js";

function isValidResult(addedTeamInformation) {
  return (
    addedTeamInformation !== undefined && addedTeamInformation._id !== undefined
  );
}

export async function addTeam(name) {
  return await tryRequest(
    async ({ name }) => {
      return await fetchJson("/api/teams", requestOption.post({ name: name }));
    },
    { name: name },
    isValidResult,
    {},
    "Team ID invalid."
  );
}

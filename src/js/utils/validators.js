import { ERROR_TYPES } from "./errors.js";

export const isAvailableTeamName = (name) => {
  if (!name || name.length < 2) {
    throw ERROR_TYPES.NOT_VALIDATE_TEAM_NAME;
  }
};

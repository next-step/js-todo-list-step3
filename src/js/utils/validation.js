import {
  MESSAGE,
  TEAM_STATE,
  TEAM_APP_STATE,
  MEMBER_STATE,
} from './constants.js';

export const checkTarget = ($target) => {
  if (!($target instanceof HTMLElement)) {
    throw new Error(`Error : ${target} - ${MESSAGE.NOT_HTML_ELEMENT}`);
  }
};

export const checkTeamAppState = (state) => {
  if (
    !state.hasOwnProperty(TEAM_APP_STATE.TEAMS) &&
    Array.isArray(state[TEAM_APP_STATE.TEAMS])
  ) {
    throw new Error(`Error : ${MESSAGE.TEAMS_PROPERTY_ERROR}`);
  }
};

export const checkTeamState = (state) => {
  if (
    !state.hasOwnProperty(TEAM_STATE.ID) &&
    typeof state[TEAM_STATE.ID] !== 'string'
  ) {
    throw new Error(`Error : ${MESSAGE.ID_PROPERTY_ERROR}`);
  }

  if (
    !state.hasOwnProperty(TEAM_STATE.NAME) &&
    typeof state[TEAM_STATE.NAME] !== 'string'
  ) {
    throw new Error(`Error : ${MESSAGE.NAME_PROPERTY_ERROR}`);
  }

  if (
    !state.hasOwnProperty(TEAM_STATE.MEMBERS) &&
    Array.isArray(state[TEAM_STATE.MEMBERS])
  ) {
    throw new Error(`Error : ${MESSAGE.MEMBERS_PROPERTY_ERROR}`);
  }
};

export const checkMemberState = (state) => {
  if (
    !state.hasOwnProperty(MEMBER_STATE.ID) &&
    typeof state[MEMBER_STATE.ID] !== 'string'
  ) {
    throw new Error(`Error : ${MESSAGE.ID_PROPERTY_ERROR}`);
  }

  if (
    !state.hasOwnProperty(MEMBER_STATE.NAME) &&
    typeof state[MEMBER_STATE.NAME] !== 'string'
  ) {
    throw new Error(`Error : ${MESSAGE.NAME_PROPERTY_ERROR}`);
  }

  if (
    !state.hasOwnProperty(MEMBER_STATE.TODO_LIST) &&
    Array.isArray(state[MEMBER_STATE.TODO_LIST])
  ) {
    throw new Error(`Error : ${MESSAGE.TODO_LIST_PROPERTY_ERROR}`);
  }

  if (
    !state.hasOwnProperty(MEMBER_STATE.SELECTED_TAB) &&
    typeof state[MEMBER_STATE.SELECTED_TAB] !== 'string'
  ) {
    throw new Error(`Error : ${MESSAGE.SELECTED_TAB_PROPERTY_ERROR}`);
  }
};

export const CURRENT_TEAM_ID = 'currentTeamId';
// export const CURRENT_TEAM_NAME = 'currentTeamName';

export const setTeamId = (teamId) => {
    window.localStorage.setItem(CURRENT_TEAM_ID, teamId);
};

export const getTeamId = () => {
    return window.localStorage.getItem(CURRENT_TEAM_ID) ?? '';
};

// export const setTeamName = (teamName) => {
//     window.localStorage.setItem(CURRENT_TEAM_NAME, teamName);
// };

// export const getTeamName = () => {
//     return window.localStorage.getItem(CURRENT_TEAM_NAME) ?? '';
// };
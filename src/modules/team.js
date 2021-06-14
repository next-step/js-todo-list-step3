import TeamState from '@store/teamsState';

const INIT_STATE = 'team/INIT_STATE';
const CREATE_TEAM = 'team/CREATE_TEAM';

export const initState = (teams) => ({ type: INIT_STATE, payload: teams });
export const createTeam = (team) => ({ type: CREATE_TEAM, payload: team });

const initialState = [];

function teamReducer(state = initialState, action) {
  const prevState = state;

  switch (action.type) {
    case INIT_STATE:
      return prevState.concat(action.payload);
    case CREATE_TEAM:
      return prevState.concat(action.payload);
    default:
      throw new Error(`존재하지 않는 action 입니다: ${action.type}`);
  }
}

export default new TeamState(teamReducer);

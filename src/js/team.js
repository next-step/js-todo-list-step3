import redux from "./redux/index.js";
import team from "./reducers/team.js";
import TeamMain from "./component/TeamMain.js";
import { dispatch } from "./redux/functions.js";
import { ACTIONS } from "./actions/team/index.js";

const init = () => {
  redux.createStore("team", team);
  dispatch(ACTIONS.LoadTeamReqAction);
  new TeamMain();
};

init();

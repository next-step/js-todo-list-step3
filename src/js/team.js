import redux from "./redux/index.js";
import team from "./reducers/team.js";
import TeamMain from "./component/TeamMain.js";
import { dispatch } from "./redux/functions.js";
import { ACTIONS } from "./actions/team.js";

const App = () => {
  redux.createStore("team", team);
  dispatch(ACTIONS.GetTeamListReqAction);
  new TeamMain();
};

App();

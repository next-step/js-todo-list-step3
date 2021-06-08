import redux from "./redux/index.js";
import todo from "./reducers/todo.js";
import KanbanMain from "./component/KanbanMain.js";
import { dispatch } from "./redux/functions.js";
import { ACTIONS } from "./actions/todo.js";

const App = () => {
  redux.createStore("todo", todo);
  const teamId = window.location.search.slice(4);
  dispatch(ACTIONS.GetSingleTeamReqAction(teamId));
  new KanbanMain();
};

App();

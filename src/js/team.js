import redux from "./redux/index.js";
import team from "./reducers/team.js";
import TeamMain from "./component/TeamMain.js";
import { dispatch } from "./redux/functions.js";
import { LoadTeamReqAction } from "./actions/team/index.js";

const init = () => {
  redux.createStore("team", team);
  dispatch(LoadTeamReqAction);
  new TeamMain();
};

init();

// const $addTeamButton = document.querySelector('#add-team-button')
// $addTeamButton.addEventListener('click', () => {
//   const result = prompt('팀 이름을 입력해주세요')
// })

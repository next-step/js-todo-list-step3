import redux from "./redux/index.js";
import team from "./reducers/team.js";
import dispatch from "./redux/dispatch.js";

redux.createStore(team);
console.log(redux);
dispatch("?");
console.log(redux);

// const $addTeamButton = document.querySelector('#add-team-button')
// $addTeamButton.addEventListener('click', () => {
//   const result = prompt('팀 이름을 입력해주세요')
// })

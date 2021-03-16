import teamState from "./module/teamState.js";
import todoState from "./module/todoState.js";

const $store = (() => {
  return {
    team: teamState,
    todo: todoState,
  };
})();

export default $store;

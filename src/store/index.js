import teamState from "./module/teamState.js";

const $store = (() => {
  return {
    team: teamState,
  };
})();

export default $store;

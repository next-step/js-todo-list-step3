import team from "./module/team.js";
import request from "./utils/request.js";

const BASE_URI = "https://js-todo-list-9ca3a.df.r.appspot.com/api";

const $api = (() => {
  request.init({ baseURI: BASE_URI });

  return {
    team,
  };
})();

export default $api;

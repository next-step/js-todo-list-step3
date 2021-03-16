import request from "./utils/request.js";
import teamApi from "./module/teamApi.js";
import todoApi from "./module/todoApi.js";

const BASE_URI = "https://js-todo-list-9ca3a.df.r.appspot.com/api";

const $api = (() => {
  request.init({ baseURI: BASE_URI });

  return {
    team: teamApi,
    todo: todoApi,
  };
})();

export default $api;

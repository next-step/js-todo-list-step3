import { Router } from "../core/Router.js";
import {Team} from "../containers/Team.js";
import {Kanban} from "../containers/Kanban.js";

const $app = document.querySelector('#app');
export const todoRouter = new Router(({ params, uri }) => {
  console.log(params, uri);
  if (uri.includes('index') || uri.length === 0) {
    return new Team($app, params);
  }
  if (uri.includes('kanban')) {
    return new Kanban($app, params);
  }
});
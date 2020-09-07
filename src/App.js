import {Team} from "./containers/Team.js";
import {Kanban} from "./containers/Kanban.js";

const $app = document.querySelector('#app');

const uri = location.pathname.split('/').pop();

if (uri.indexOf('index') === 0 || uri.length === 0) {
  new Team($app);
}
if (uri.indexOf('kanban') === 0) {
  new Kanban($app);
}
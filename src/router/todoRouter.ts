import { Router } from "../core/Router";
import { Team } from "../containers/Team";
import { Kanban } from "../containers/Kanban";

const $app = document.querySelector('#app');
export const todoRouter = new Router((uri: string) => {
  console.log(uri);
  if (uri.includes('index') || uri.length === 0) {
    return new Team($app);
  }
  if (uri.includes('kanban')) {
    return new Kanban($app);
  }
});
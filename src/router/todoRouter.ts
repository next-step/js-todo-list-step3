import {Router} from "@/core";
import {Team, Kanban} from "@/containers";
import {selectElement} from "@/utils";

const $app = selectElement('#app');

export const todoRouter = new Router((uri: string) => {
  if (uri.includes('index') || uri.length === 0) {
    return new Team($app);
  }
  if (uri.includes('kanban')) {
    return new Kanban($app);
  }
});
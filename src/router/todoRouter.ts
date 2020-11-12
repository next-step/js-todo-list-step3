import {Router} from "@/_core";
import {Team, Kanban} from "@/views";
import {selectElement} from "@/utils";

const $app = selectElement('#app');

export const todoRouter = new Router((uri: string) => {

  if (uri.includes('kanban')) {
    return new Kanban($app);
  }

  return new Team($app);

});

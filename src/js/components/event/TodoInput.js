import { fetchRequest } from "../../lib/fetchRequest.js";
import { API_URL, METHOD } from "../../constants/config.js";
import { ERROR_MESSAGES } from "../../constants/message.js";

import TodoItemModel from "../model/TodoItemModel.js";

async function onAddItem(target) {
  const teamId = this.teamData._id;
  const memberId = target.dataset.id;
  const contents = target.value;

  const { response, error } = await fetchRequest(API_URL.ITEM(teamId, memberId), METHOD.POST, {
    contents,
  });

  if (error) return alert(ERROR_MESSAGES.ADD_ITEM);

  this.memberList.filter((member) => {
    if (member.id === memberId) {
      member.todoList.push(new TodoItemModel({ ...response, id: response._id }));
    }
  });
  this.render();
}

export { onAddItem };

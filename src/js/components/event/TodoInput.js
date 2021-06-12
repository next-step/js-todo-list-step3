import { fetchRequest } from "../../lib/fetchRequest.js";
import { API_URL, METHOD } from "../../constants/config.js";
import { ERROR_MESSAGES } from "../../constants/message.js";
import { KEY } from "../../constants/eventKey.js";
import { MINIMUM_LENGTH } from "../../constants/constant.js";

import TodoItemModel from "../model/TodoItemModel.js";

async function onAddItem(event) {
  if (event.key !== KEY.ENTER) return;
  if (event.target.value.length < MINIMUM_LENGTH.ITEM_CONTENTS)
    return alert(ERROR_MESSAGES.TOO_SHORT_ITEM_CONTENTS);

  const teamId = this.teamData._id;
  const memberId = event.target.dataset.memberid;
  const contents = event.target.value;

  const { response, error } = await fetchRequest(API_URL.ITEM(teamId, memberId), METHOD.POST, {
    contents,
  });

  if (error) return alert(ERROR_MESSAGES.ADD_ITEM);

  this.memberList.filter((member) => {
    if (member.id === memberId) {
      member.todoList.push(new TodoItemModel({ ...response, id: response._id }));
    }
  });

  event.target.value = "";
  this.render();
}

export { onAddItem };

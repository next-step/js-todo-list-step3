import { fetchRequest } from "../../lib/fetchRequest.js";
import { API_URL, METHOD } from "../../constants/config.js";
import { ERROR_MESSAGES } from "../../constants/message.js";

async function onDeleteAllItem(event) {
  const teamId = this.teamData._id;
  const memberId = event.target.dataset.id;

  const { error } = await fetchRequest(API_URL.ITEM(teamId, memberId), METHOD.DELETE);
  if (error) return alert(ERROR_MESSAGES.DELETE_ALL_ITEMS);

  this.memberList.filter((member) => {
    if (member.id === memberId) {
      member.todoList = [];
    }
  });

  this.render();
}

export { onDeleteAllItem };

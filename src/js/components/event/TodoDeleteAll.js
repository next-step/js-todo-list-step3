import { fetchRequest } from "../../lib/fetchRequest.js";
import { API_URL, METHOD } from "../../constants/config.js";
import { ERROR_MESSAGES } from "../../constants/message.js";

async function onDeleteAllItem(event) {
  const teamId = this.teamData._id;
  const memberIndex = event.target.dataset.memberindex;
  const memberId = this.memberListData[memberIndex].id;

  const { error } = await fetchRequest(API_URL.ITEM(teamId, memberId), METHOD.DELETE);
  if (error) return alert(ERROR_MESSAGES.DELETE_ALL_ITEMS);

  this.memberListData[memberIndex].todoList = [];

  this.render(this.memberListData);
}

export { onDeleteAllItem };

import { fetchRequest } from "../../lib/fetchRequest.js";
import { API_URL, METHOD } from "../../constants/config.js";
import { ERROR_MESSAGES } from "../../constants/message.js";

async function onDeleteItem(event) {
  const teamId = this.teamData._id;
  const memberId = event.target.dataset.memberid;
  const itemId = event.target.dataset.itemid;

  const { error } = await fetchRequest(
    API_URL.MEMBER_ITEM(teamId, memberId, itemId),
    METHOD.DELETE
  );
  if (error) return alert(ERROR_MESSAGES.DELETE_ITEM);

  this.memberList.map((member, index) => {
    if (member.id === memberId) {
      this.memberList[index].todoList = this.memberList[index].todoList.filter((item) => {
        if (item.id !== itemId) {
          return item;
        }
      });
    }
  });

  this.render();
}

export { onDeleteItem };

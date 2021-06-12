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
      const todoList = this.memberList[index].todoList;
      this.memberList[index].todoList = todoList.filter((item) => {
        if (item.id !== itemId) {
          return item;
        }
      });
    }
  });

  this.render();
}

async function onCompleteItem(event) {
  const teamId = this.teamData._id;
  const memberId = event.target.dataset.memberid;
  const itemId = event.target.dataset.itemid;

  const { error } = await fetchRequest(API_URL.ITEM_TOGGLE(teamId, memberId, itemId), METHOD.PUT);

  if (error) return alert(ERROR_MESSAGES.COMPLETE_ITEM);

  this.memberList.map((member, index) => {
    if (member.id === memberId) {
      const todoList = this.memberList[index].todoList;
      todoList.map((item) => {
        item.id === itemId && (item.isCompleted = !item.isCompleted);
      });
    }
  });

  this.render();
}

export { onDeleteItem, onCompleteItem };

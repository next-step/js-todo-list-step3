import { fetchRequest } from "../../lib/fetchRequest.js";
import { API_URL, METHOD } from "../../constants/config.js";
import { ERROR_MESSAGES } from "../../constants/message.js";
import { KEY } from "../../constants/eventKey.js";

async function onDeleteItem(event) {
  const teamId = this.teamData._id;
  const memberIndex = event.target.dataset.memberindex;
  const memberId = this.memberList[memberIndex].id;
  const itemId = event.target.dataset.itemid;

  const { error } = await fetchRequest(
    API_URL.MEMBER_ITEM(teamId, memberId, itemId),
    METHOD.DELETE
  );
  if (error) return alert(ERROR_MESSAGES.DELETE_ITEM);

  this.memberList[memberIndex].todoList = this.memberList[memberIndex].todoList.filter((item) => {
    if (item.id !== itemId) {
      return item;
    }
  });

  this.render();
}

async function onCompleteItem(event) {
  const teamId = this.teamData._id;
  const memberIndex = event.target.dataset.memberindex;
  const memberId = this.memberList[memberIndex].id;
  const itemId = event.target.dataset.itemid;

  const { error } = await fetchRequest(API_URL.ITEM_TOGGLE(teamId, memberId, itemId), METHOD.PUT);

  if (error) return alert(ERROR_MESSAGES.COMPLETE_ITEM);

  this.memberList[memberIndex].todoList.map((item) => {
    item.id === itemId && (item.isCompleted = !item.isCompleted);
  });

  this.render();
}

function onEditingItem(event) {
  const memberIndex = event.target.dataset.memberindex;
  const itemId = event.target.dataset.itemid;

  this.memberList[memberIndex].todoList.map((item) => {
    item.id === itemId && (item.editing = !item.editing);
  });

  this.render();
}

async function onEditItem(event) {
  const teamId = this.teamData._id;
  const memberIndex = event.target.dataset.memberindex;
  const memberId = this.memberList[memberIndex].id;
  const itemId = event.target.dataset.itemid;

  if (event.key === KEY.ESCAPE) {
    this.memberList[memberIndex].todoList.map((item) => {
      item.id === itemId && (item.editing = !item.editing);
    });

    this.render();
  }
  if (event.key === KEY.ENTER) {
    const { response, error } = await fetchRequest(
      API_URL.MEMBER_ITEM(teamId, memberId, itemId),
      METHOD.PUT,
      { contents: event.target.value }
    );

    if ((response, error)) return alert(ERROR_MESSAGES.EDIT_ITEM);

    this.memberList[memberIndex].todoList.map((item) => {
      if (item.id === itemId) {
        item.contents = response.contents;
        item.editing = !item.editing;
      }
    });

    this.render();
  }
}

export { onDeleteItem, onCompleteItem, onEditingItem, onEditItem };

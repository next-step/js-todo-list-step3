import { fetchRequest } from "../../lib/fetchRequest.js";
import { API_URL, METHOD } from "../../constants/config.js";
import { INFORM_MESSAGES, ERROR_MESSAGES } from "../../constants/message.js";

import MemberModel from "../model/MemberModel.js";
import TodoItemModel from "../model/TodoItemModel.js";

async function onAddMember() {
  const memberName = prompt(INFORM_MESSAGES.ADD_MEMBER);
  if (!memberName) return;

  const { response, error } = await fetchRequest(API_URL.MEMBERS(this.teamData._id), METHOD.POST, {
    name: memberName,
  });

  if (error) return alert(ERROR_MESSAGES.ADD_MEMBER);

  this.memberListData = response.members.map((member) => {
    return new MemberModel({
      ...member,
      id: member._id,
      todoList: !member.todoList
        ? []
        : member.todoList.map((item) => {
            return new TodoItemModel({ ...item, id: item._id });
          }),
    });
  });

  this.render(this.memberListData);
}

export { onAddMember };

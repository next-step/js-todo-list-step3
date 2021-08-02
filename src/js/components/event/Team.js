import { fetchRequest } from "../../lib/fetchRequest.js";
import { API_URL, METHOD } from "../../constants/config.js";
import { INFORM_MESSAGES, ERROR_MESSAGES } from "../../constants/message.js";
import { PRIORITY } from "../../constants/constant.js";

import MemberModel from "../model/MemberModel.js";
import TodoItemModel from "../model/TodoItemModel.js";

async function onAddMember() {
  const memberName = prompt(INFORM_MESSAGES.ADD_MEMBER);
  if (!memberName) return;

  const { response, error } = await fetchRequest(API_URL.MEMBERS(this.teamData._id), METHOD.POST, {
    name: memberName,
  });

  if (error) return alert(ERROR_MESSAGES.ADD_MEMBER);

  const newMember = response.members[response.members.length - 1];

  this.memberListData.push(
    new MemberModel({
      ...newMember,
      id: newMember._id,
      todoList: !newMember.todoList
        ? []
        : newMember.todoList.map((item) => {
            return new TodoItemModel({ ...item, id: item._id, priority: PRIORITY[item.priority] });
          }),
    })
  );

  this.render(this.memberListData);
}

export { onAddMember };

import { $ } from "../lib/util.js";
import { fetchRequest } from "../lib/fetchRequest.js";
import { TEMPLATE } from "../constants/template.js";
import { API_URL, METHOD } from "../constants/config.js";
import { INFORM_MESSAGES, ERROR_MESSAGES } from "../constants/message.js";

import MemberModel from "./model/MemberModel.js";
import TodoItemModel from "./model/TodoItemModel.js";
import TeamTitle from "./TeamTitle.js";
import Member from "./Member.js";

class Team {
  constructor({ teamData }) {
    this.teamData = teamData;
    this.memberList = this.teamData.members.map((member) => {
      return new MemberModel({
        ...member,
        id: member._id,
        todoList: member.todoList.map((item) => {
          return new TodoItemModel({ ...item, id: item._id });
        }),
      });
    });
    new TeamTitle({ titleName: this.teamData.name });
    this.init();
  }

  init() {
    this.render(this.memberList);
    this.registerEventListener();
  }

  render() {
    const template = this.memberList
      .map((member) => {
        return `<li class="todoapp-container" >
        ${new Member().render(member)}
        </li>`;
      })
      .join("");

    $(".todoapp-list-container").innerHTML = template + TEMPLATE.ADD_MEMBER_BUTTON;
  }

  registerEventListener() {
    $("#add-user-button").addEventListener("click", this.onAddMember.bind(this));
  }

  async onAddMember() {
    const memberName = prompt(INFORM_MESSAGES.ADD_MEMBER);
    if (!memberName) return;

    const { response, error } = await fetchRequest(
      API_URL.MEMBERS(this.teamData._id),
      METHOD.POST,
      {
        name: memberName,
      }
    );

    if (error) return alert(ERROR_MESSAGES.ADD_MEMBER);

    this.memberList = response.members;

    this.render();
  }
}

export default Team;

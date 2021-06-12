import { $ } from "../lib/util.js";
import { fetchRequest } from "../lib/fetchRequest.js";
import { TEMPLATE } from "../constants/template.js";
import { API_URL, METHOD } from "../constants/config.js";
import { INFORM_MESSAGES, ERROR_MESSAGES } from "../constants/message.js";

import MemberModel from "./model/MemberModel.js";
import TodoItemModel from "./model/TodoItemModel.js";
import TeamTitle from "./TeamTitle.js";
import Member from "./Member.js";
import TodoInput from "./TodoInput.js";

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
    this.todoInput = new TodoInput({ onAddItem: this.onAddItem.bind(this) });
    this.init();
  }

  init() {
    this.render();
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

    this.addEvent();
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

    this.memberList = response.members.map((member) => {
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

    this.render();
  }

  addEvent() {
    new TodoInput({ onAddItem: this.onAddItem.bind(this) });
  }

  async onAddItem(target) {
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
}

export default Team;

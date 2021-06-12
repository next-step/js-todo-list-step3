import { $, $$ } from "../lib/util.js";
import { TEMPLATE } from "../constants/template.js";

import MemberModel from "./model/MemberModel.js";
import TodoItemModel from "./model/TodoItemModel.js";
import TeamTitle from "./TeamTitle.js";
import Member from "./Member.js";
import TodoInput from "./TodoInput.js";
import TodoDeleteAll from "./TodoDeleteAll.js";

import { onAddMember } from "./event/Team.js";
import { onAddItem } from "./event/TodoInput.js";
import { onDeleteAllItem } from "./event/TodoDeleteAll.js";
import { onDeleteItem, onCompleteItem } from "./event/TodoList.js";

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
    this.onAddMember = onAddMember;
    this.onDeleteItem = onDeleteItem;
    this.onCompleteItem = onCompleteItem;
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    const template = this.memberList
      .map((member) => {
        return `<li class="todoapp-container" >
        ${new Member({ onDeleteItem: onDeleteItem.bind(this) }).render(member)}
        </li>`;
      })
      .join("");

    $(".todoapp-list-container").innerHTML = template + TEMPLATE.ADD_MEMBER_BUTTON;

    this.registerEventListener();
    this.addComponentEvent();
  }

  registerEventListener() {
    //Team 이벤트
    $("#add-user-button").addEventListener("click", this.onAddMember.bind(this));

    //TodoList 이벤트
    $$(".destroy").forEach((button) => {
      button.addEventListener("click", (event) => this.onDeleteItem(event));
    });
    $$(".toggle").forEach((button) => {
      button.addEventListener("click", (event) => this.onCompleteItem(event));
    });
  }

  addComponentEvent() {
    new TodoInput({ onAddItem: onAddItem.bind(this) });
    new TodoDeleteAll({ onDeleteAll: onDeleteAllItem.bind(this) });
  }
}

export default Team;

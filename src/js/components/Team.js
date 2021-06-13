import { $, $$ } from "../lib/util.js";

import MemberModel from "./model/MemberModel.js";
import TodoItemModel from "./model/TodoItemModel.js";
import TeamTitle from "./TeamTitle.js";
import MemberList from "./MemberList.js";
import TodoInput from "./TodoInput.js";
import TodoDeleteAll from "./TodoDeleteAll.js";
import TodoFilter from "./TodoFilter.js";

import { onAddMember } from "./event/Team.js";
import { onAddItem } from "./event/TodoInput.js";
import { onDeleteAllItem } from "./event/TodoDeleteAll.js";
import {
  onDeleteItem,
  onCompleteItem,
  onEditingItem,
  onEditItem,
  onSetPriority,
} from "./event/TodoList.js";
import { filtering } from "./event/TodoFilter.js";

class Team {
  constructor({ teamData }) {
    this.teamData = teamData;
    this.memberListData = this.teamData.members.map((member) => {
      return new MemberModel({
        ...member,
        id: member._id,
        todoList: member.todoList.map((item) => {
          return new TodoItemModel({ ...item, id: item._id });
        }),
      });
    });
    new TeamTitle({ titleName: this.teamData.name });
    this.memberList = new MemberList({ memberList: this.memberListData });
    this.onAddMember = onAddMember;
    this.onDeleteItem = onDeleteItem;
    this.onCompleteItem = onCompleteItem;
    this.onEditingItem = onEditingItem;
    this.onEditItem = onEditItem;
    this.onSetPriority = onSetPriority;
    this.init();
  }

  init() {
    this.render(this.memberListData);
  }

  render(memberListData) {
    this.memberList.render(memberListData);
    this.registerEventListener();
    this.addComponentEvent();
  }

  registerEventListener() {
    //Team 이벤트
    $("#add-user-button").addEventListener("click", this.onAddMember.bind(this));
    //TodoList 이벤트
    $$(".destroy").forEach((element) => {
      element.addEventListener("click", (event) => this.onDeleteItem(event));
    });
    $$(".toggle").forEach((element) => {
      element.addEventListener("click", (event) => this.onCompleteItem(event));
    });
    $$(".label").forEach((element) => {
      element.addEventListener("dblclick", (event) => this.onEditingItem(event));
    });
    $$(".edit").forEach((element) => {
      element.addEventListener("keydown", (event) => this.onEditItem(event));
    });
    $$(".select").forEach((element) => {
      element.addEventListener("click", (event) => {
        this.onSetPriority(event);
      });
    });
  }

  addComponentEvent() {
    new TodoInput({ onAddItem: onAddItem.bind(this) });
    new TodoDeleteAll({ onDeleteAll: onDeleteAllItem.bind(this) });
    new TodoFilter({ filtering: filtering.bind(this) });
  }
}

export default Team;

import {
  ADD_MEMBER_TODOITEM,
  DELETE_MEMBER_TODOITEM,
  DELETE_MEMBER_TODOITEMS,
  DELETE_USER_TODOITEM,
  DELETE_USER_TODOITEMS,
  GET_MEMBER_TODOITEMS,
  UPDATE_MEMBER_TODOITEM,
  UPDATE_MEMBER_TODOITEM_PRIORITY,
  UPDATE_MEMBER_TODOITEM_TOGGLE,
  UPDATE_USER_TODOITEM,
  UPDATE_USER_TODOITEM_COMPLETE,
  UPDATE_USER_TODOITEM_PRIORTY,
} from "../../setting/api.js";
import { checkNull } from "../../utils/stringUtils.js";
import TodoInput from "./todoInput.js";
import TodoList from "./todoList.js";
import { parseUser } from "../user/user.js";
import TodoCount from "./todoCount.js";

export default function TodoApp() {
  this.render = async (members) => {
    this.todoInput.render();
    this.members =
      (await Promise.all(
        members.map((member) => {
          return fetch(member);
        })
      )) ?? [];
    this.todoList.render(this.members);
    this.todoCount.render();
  };

  const fetch = async (member) => {
    const fetchMember = await GET_MEMBER_TODOITEMS(this.teamId, member.getId());
    const replaceMember = parseUser(fetchMember);
    replaceMember.parseItem();
    return replaceMember;
  };

  this.add = async (memberId, contents) => {
    await ADD_MEMBER_TODOITEM(this.teamId, memberId, contents);
    this.render(this.members);
  };

  this.complete = async (memberId, itemId) => {
    await UPDATE_MEMBER_TODOITEM_TOGGLE(this.teamId, memberId, itemId);
    this.render(this.members);
  };

  this.delete = async (memberId, itemId) => {
    await DELETE_MEMBER_TODOITEM(this.teamId, memberId, itemId);
    this.render(this.members);
  };

  this.deleteAll = async (memberId) => {
    await DELETE_MEMBER_TODOITEMS(this.teamId, memberId);
    this.render(this.members);
  };

  this.edit = async (memberId, itemId, contents) => {
    await UPDATE_MEMBER_TODOITEM(this.teamId, memberId, itemId, contents);
    this.render(this.members);
  };

  this.changePriority = async (memberId, itemId, priority) => {
    await UPDATE_MEMBER_TODOITEM_PRIORITY(
      this.teamId,
      memberId,
      itemId,
      priority
    );
    this.render(this.members);
  };

  this.init = (teamId) => {
    this.todoList = new TodoList(this);
    this.todoInput = new TodoInput(this);
    this.todoCount = new TodoCount(this);
    this.teamId = teamId;
  };
}

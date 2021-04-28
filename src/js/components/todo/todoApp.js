import {
  ADD_MEMBER_TODOITEM,
  DELETE_MEMBER_TODOITEM,
  DELETE_USER_TODOITEM,
  DELETE_USER_TODOITEMS,
  GET_MEMBER_TODOITEMS,
  UPDATE_USER_TODOITEM,
  UPDATE_USER_TODOITEM_COMPLETE,
  UPDATE_USER_TODOITEM_PRIORTY,
} from "../../setting/api.js";
import { checkNull } from "../../utils/stringUtils.js";
import TodoInput from "./todoInput.js";
import TodoList from "./todoList.js";
import { parseUser } from "../user/user.js";

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

  this.complete = async (id) => {
    await UPDATE_USER_TODOITEM_COMPLETE(activeUser.getId(), id);
    this.render();
  };

  this.delete = async (memberId, itemId) => {
    await DELETE_MEMBER_TODOITEM(this.teamId, memberId, itemId);
    this.render(this.members);
  };

  this.deleteAll = async () => {
    await DELETE_USER_TODOITEMS(activeUser.getId());
    this.render();
  };

  this.editing = async (id) => {
    await this.render();
    this.todoList.editing(id);
  };

  this.edit = async (id, content) => {
    await UPDATE_USER_TODOITEM(activeUser.getId(), id, content);
    this.render();
  };

  this.changePriority = async (id, priority) => {
    await UPDATE_USER_TODOITEM_PRIORTY(activeUser.getId(), id, priority);
    this.render();
  };

  this.init = (teamId) => {
    this.todoList = new TodoList(this);
    this.todoInput = new TodoInput(this);
    this.teamId = teamId;
  };
}

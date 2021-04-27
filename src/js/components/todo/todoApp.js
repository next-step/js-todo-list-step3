import {
  ADD_USER_TODOITEM,
  DELETE_USER_TODOITEM,
  DELETE_USER_TODOITEMS,
  GET_TEAM,
  GET_USER_TODOITEMS,
  UPDATE_USER_TODOITEM,
  UPDATE_USER_TODOITEM_COMPLETE,
  UPDATE_USER_TODOITEM_PRIORTY,
} from "../../setting/api.js";
import { checkNull } from "../../utils/stringUtils.js";
import { parseTeam } from "../team/team.js";
import TodoInput from "./todoInput.js";
import { parseItem } from "./todoItem.js";
import TodoList from "./todoList.js";
import { parseUser } from "../user/user.js";
import TeamTitle from "../team/teamTitle.js";

export default function TodoApp() {
  this.render = async () => {
    this.todoList.render(this.members);
    // const userTodoItem = checkNull(activeUser)
    //   ? []
    //   : await GET_USER_TODOITEMS(activeUser.getId());
    // todoItems = userTodoItem.map((item) => parseItem(item));
    // this.todoList.render(todoItems);
  };

  this.add = async (content) => {
    await ADD_USER_TODOITEM(activeUser.getId(), content);
    this.render();
  };

  this.complete = async (id) => {
    await UPDATE_USER_TODOITEM_COMPLETE(activeUser.getId(), id);
    this.render();
  };

  this.delete = async (id) => {
    await DELETE_USER_TODOITEM(activeUser.getId(), id);
    this.render();
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

  this.init = async (teamId) => {
    const team = await GET_TEAM(teamId);
    this.team = parseTeam(team);
    new TeamTitle().render(this.team.getName());
    const members = this.team.getMembers();
    this.members = members ? members.map((member) => parseUser(member)) : [];
    this.members.forEach((member) => member.parseItem());
    // new TodoInput(this);
    this.todoList = new TodoList(this);
    this.render();
  };
}

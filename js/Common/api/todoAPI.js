import { request, options } from "./request.js";
import { BASE_URL, METHOD } from "../constants.js";
import { validateInstance } from "../utils.js";

const addTodoItem = async (teamId, memberId, contents) =>
  request(
    `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items`,
    options(METHOD.POST, { contents })
  );

const deleteTodoItem = async (teamId, memberId, itemId) =>
  request(
    `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
    options(METHOD.DELETE)
  );

const toggleTodoItem = async (teamId, memberId, itemId) =>
  request(
    `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`,
    options(METHOD.PUT)
  );

const editTodoItemContents = async (teamId, memberId, itemId, contents) =>
  request(
    `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
    options(METHOD.PUT, { contents })
  );

const setTodoItemPriority = async (teamId, memberId, itemId, priority) =>
  request(
    `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`,
    options(METHOD.PUT, { priority })
  );

const deleteAllTodoItem = async (teamId, memberId) =>
  request(
    `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items`,
    options(METHOD.DELETE)
  );

function todoAPI(teamId, memberId) {
  validateInstance(todoAPI, this);
  this.teamId = teamId;
  this.memberId = memberId;

  this.addTodoItem = (contents) =>
    addTodoItem(this.teamId, this.memberId, contents);

  this.deleteTodoItemById = (itemId) =>
    deleteTodoItem(this.teamId, this.memberId, itemId);

  this.toggleTodoItemById = (itemId) =>
    toggleTodoItem(this.teamId, this.memberId, itemId);

  this.editTodoItemContentsById = (itemId, contents) =>
    editTodoItemContents(this.teamId, this.memberId, itemId, contents);

  this.setTodoItemPriorityById = (itemId, priority) =>
    setTodoItemPriority(this.teamId, this.memberId, itemId, priority);

  this.deleteAllTodoItem = () => deleteAllTodoItem(this.teamId, this.memberId);
}

export default todoAPI;

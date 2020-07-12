import {
  getTeamDetail, addMember, addMemberTodo, deleteMemberTodo, toggleMemberTodo, editMemberTodo,
} from './api/index.js';
import { todoListTemplate, addTodoItemTemplate } from './template.js';
import { KEYCODE_ENTER, KEYCODE_ESC } from './constants.js';
import { isValidContent } from './util.js';

function App() {
  this.teamId = '';
  this.teamName = '';
  this.members = '';
  this.membersById = {};

  const $teamTitle = document.querySelector('#team-title');
  const $memberTodoList = document.querySelector('#member-todo-list');

  this.inputMemberNameAndSend = async () => {
    const memberName = prompt('새로운 팀원 이름을 입력해주세요');
    if (!memberName) return;
    const { error, errorMessage } = await this.addMember(memberName);
    if (error) return alert(errorMessage);
    this.getTeamDetail();
  };

  this.addMember = async (memberName) => {
    const { result, error, errorMessage } = await addMember(this.teamId, memberName);
    if (error) return alert(errorMessage);
    return result;
  };

  this.getTeamDetail = async (id) => {
    const { result, error, errorMessage } = await getTeamDetail(id);
    if (error) return alert(errorMessage);
    this.setState(result);
    return result;
  };

  this.setState = (data) => {
    this.teamId = data._id;
    this.teamName = data.name;
    this.members = data.members;
    this.membersById = this.members.reduce((obj, item) => {
      obj[item._id] = item;
      return obj;
    }, {});
    this.render();
  };

  this.render = () => {
    $teamTitle.querySelector('strong').innerHTML = this.teamName;
    $memberTodoList.innerHTML = this.members.map((item) => todoListTemplate(item)).join('') + addTodoItemTemplate();
  };

  this.init = () => {
    const params = (new URL(document.location)).searchParams;
    const teamId = params.get('id');
    this.getTeamDetail(teamId);
  };

  const $todoApps = document.querySelector('.todoapp-list-container');

  this.addTodo = (event) => {
    if (event.key !== KEYCODE_ENTER) return;

    const $todoInput = event.target.closest('.new-todo');
    const memberId = $todoInput.closest('.todoapp-container').id;
    const newTodoContents = event.target.value;
    if (!isValidContent(newTodoContents)) return;

    addMemberTodo(this.teamId, memberId, newTodoContents);
    $todoInput.value = '';
    this.getTeamDetail(this.teamId);
  };

  this.deleteTodo = async (memberId, itemId) => {
    await deleteMemberTodo(this.teamId, memberId, itemId);
  };

  this.toggleTodo = async (memberId, itemId) => {
    await toggleMemberTodo(this.teamId, memberId, itemId);
  };

  this.onClickTodoItem = async (event) => {
    const { target } = event;
    const { classList } = target;
    const memberId = target.closest('.todoapp-container').id;
    const $clickedItem = target.closest('.todo-list-item');
    if (!$clickedItem) return;
    const itemId = $clickedItem.dataset.id;
    if (classList.contains('destroy')) {
      await this.deleteTodo(memberId, itemId);
      await this.getTeamDetail(this.teamId);
    }
    if (classList.contains('toggle')) {
      await this.toggleTodo(memberId, itemId);
      await this.getTeamDetail(this.teamId);
    }
  };

  this.onEnterEditMode = async (event) => {
    const { target } = event;
    const memberId = target.closest('.todoapp-container').id;
    const $todoItem = target.closest('.todo-list-item');
    const itemId = $todoItem.dataset.id;
    $todoItem.classList.add('editing');

    const $editInput = $todoItem.querySelector('.edit');
    const originValue = (
      this.membersById[memberId].todoList.find((item) => item._id === itemId) || {}
    ).contents;
    $editInput.value = originValue || '';
    $editInput.focus();
    const size = $editInput.value.length;
    $editInput.setSelectionRange(size, size); // set cursor position
  };

  this.onKeyUpTodoItem = async (event) => {
    const $newTodoInput = event.target.closest('.new-todo');
    const $editTodoInput = event.target.closest('.edit');

    if (!$newTodoInput && !$editTodoInput) return;

    if ($newTodoInput) {
      this.addTodo(event);
    }
    if ($editTodoInput) {
      this.editTodo(event);
    }
  };

  this.editTodo = async (event) => {
    if (event.key !== KEYCODE_ESC && event.key !== KEYCODE_ENTER) return;

    const { target } = event;
    const $todoContainer = target.closest('.todoapp-container');
    const $todoItem = target.closest('.todo-list-item');
    if (event.key === KEYCODE_ESC) {
      $todoItem.classList.remove('editing');
    }
    const newTodoContents = target.value;
    if (!isValidContent(newTodoContents)) return;
    if (event.key === KEYCODE_ENTER) {
      const memberId = $todoContainer.id;
      const itemId = $todoItem.dataset.id;
      editMemberTodo(this.teamId, memberId, itemId, newTodoContents);
      this.getTeamDetail(this.teamId);
    }
  };

  $todoApps.addEventListener('keyup', this.onKeyUpTodoItem);
  $todoApps.addEventListener('click', this.onClickTodoItem);
  $todoApps.addEventListener('dblclick', this.onEnterEditMode);

  $todoApps.addEventListener('click', (e) => {
    const $target = e.target;
    const targetClassList = $target.classList;
    if (targetClassList.contains('chip')) {
      const $chipSelect = $target.closest('.chip-container').querySelector('select');
      $target.classList.add('hidden');
      $chipSelect.classList.remove('hidden');
    }
  });

  $memberTodoList.addEventListener('click', (event) => {
    if (event.target.closest('#add-user-button')) {
      this.inputMemberNameAndSend();
    }
  });
}

const app = new App();
app.init();

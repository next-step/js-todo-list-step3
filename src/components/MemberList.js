import { KEY, PRIORITY } from '../constants.js';
import { addMemberButtonTemplate, memberTemplate } from '../templates.js';

export default class MemberList {
  constructor({
    onAddMember,
    onFilterTodoList,
    onDeleteTodoList,
    onAddTodoItem,
    onDeleteTodoItem,
    onToggleTodoItem,
    onUpdateTodoItem,
    onUpdateTodoItemPriority,
  }) {
    this.$team = document.querySelector('.todoapp-list-container');

    this.$team.addEventListener('click', (event) => this.addMember(event, onAddMember));
    this.$team.addEventListener('click', (event) => this.filterTodoList(event, onFilterTodoList));
    this.$team.addEventListener('click', (event) => this.deleteTodoList(event, onDeleteTodoList));
    this.$team.addEventListener('keydown', (event) => this.addTodoItem(event, onAddTodoItem));
    this.$team.addEventListener('click', (event) => this.deleteTodoItem(event, onDeleteTodoItem));
    this.$team.addEventListener('click', (event) => this.toggleTodoItem(event, onToggleTodoItem));
    this.$team.addEventListener('dblclick', (event) => this.editTodoItem(event));
    this.$team.addEventListener('keydown', (event) => this.updateTodoItem(event, onUpdateTodoItem));
    this.$team.addEventListener('change', (event) => this.updateTodoItemPriority(event, onUpdateTodoItemPriority));
  }

  render(members) {
    const template = members.map(memberTemplate);
    this.$team.innerHTML = template.join('') + addMemberButtonTemplate;
  }

  addMember(event, onAddMember) {
    const addMemberButtonTarget = event.target;
    if (addMemberButtonTarget.id !== 'add-user-button') return;
    onAddMember();
  }

  filterTodoList(event, onFilterTodoList) {
    const filterButtonTarget = event.target;
    if (filterButtonTarget.tagName !== 'A') return;

    const [filterName] = filterButtonTarget.classList;
    onFilterTodoList(filterButtonTarget.id, filterName);
  }

  deleteTodoList(event, onDeleteTodoList) {
    const clearButtonTarget = event.target;
    if (!clearButtonTarget.classList.contains('clear-completed')) return;
    onDeleteTodoList(clearButtonTarget.id);
  }

  addTodoItem(event, onAddTodoItem) {
    if (event.key !== KEY.ENTER) return;

    const todoInputTarget = event.target;
    if (!todoInputTarget.classList.contains('new-todo')) return;
    if (todoInputTarget.value === '') return;

    onAddTodoItem(todoInputTarget.id, todoInputTarget.value);
    todoInputTarget.value = '';
  }

  deleteTodoItem(event, onDeleteTodoItem) {
    const deleteButtonTarget = event.target;
    if (!deleteButtonTarget.classList.contains('destroy')) return;
    const todoList = deleteButtonTarget.closest('ul');
    onDeleteTodoItem(todoList.id, deleteButtonTarget.id);
  }

  toggleTodoItem(event, onToggleTodoItem) {
    const toggleButtonTarget = event.target;
    if (!toggleButtonTarget.classList.contains('toggle')) return;
    const todoList = toggleButtonTarget.closest('ul');
    onToggleTodoItem(todoList.id, toggleButtonTarget.id);
  }

  editTodoItem(event) {
    const labelTarget = event.target;
    if (!labelTarget.classList.contains('label')) return;

    const todoItem = labelTarget.closest('li');
    todoItem.classList.toggle('editing');

    const editingInput = todoItem.querySelector('.edit');
    editingInput.focus();
    const { length } = editingInput.value;
    editingInput.setSelectionRange(length, length);
  }

  updateTodoItem(event, onUpdateTodoItem) {
    const { key, target: editingInputTarget } = event;
    if (!editingInputTarget.classList.contains('edit')) return;

    const todoItem = editingInputTarget.closest('li');

    if (key === KEY.ESCAPE) {
      todoItem.classList.remove('editing');
      return;
    }

    if (key !== KEY.ENTER) return;

    const { value } = editingInputTarget;
    if (value === '') return;
    const todoList = editingInputTarget.closest('ul');
    onUpdateTodoItem(todoList.id, todoItem.id, value);
  }

  updateTodoItemPriority(event, onUpdateTodoItemPriority) {
    const selectTarget = event.target;
    if (!selectTarget.classList.contains('select')) return;

    const todoItem = selectTarget.closest('li');

    const { value } = selectTarget;
    let priority;
    if (value === '0') priority = PRIORITY.NONE;
    if (value === '1') priority = PRIORITY.FIRST;
    if (value === '2') priority = PRIORITY.SECOND;
    const todoList = selectTarget.closest('ul');
    onUpdateTodoItemPriority(todoList.id, todoItem.id, priority);
  }
}

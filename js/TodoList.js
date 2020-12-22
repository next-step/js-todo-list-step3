import {priorityHTML, todoList} from "./constant/template.js";
import {PRIORITY} from "./util/request.js";
import Task from "./components/Task.js";
import {
  addTodoItemOfTeamMember,
  deleteAllTodoListOfTeamMember,
  deleteTodoItemOfTeamMember,
  toggleTodoItemOfTeamMember, updateTodoPriorityOfTeamMember, updateUserTodoContentsOfTeamMember
} from "./util/api.js";

export class TodoList {
  constructor(el, user) {
    this.el = el;
    this.user = user;
    this.teamId = history.state.id;
    this.isEditMode = false;
    this.init();
    this.render();
  }

  init() {
    const {_id, name} = this.user;
    this.memberId = _id;
    const li = document.createElement('li');
    li.classList.add('todoapp-container');
    li.dataset.id = _id;
    li.innerHTML = `
      ${todoList.title(name)}
      ${todoList.inputBox}
      ${todoList.todoContainer}
      ${todoList.todoBottom}
    `;
    this.$todoListContainer = li;
    this.initDomElements();
  }

  initDomElements() {
    this.$newTodo = this.$todoListContainer.querySelector('.new-todo');
    this.$todoCount = this.$todoListContainer.querySelector('.todo-count strong');
    this.$filter = this.$todoListContainer.querySelector('.count-container .filters');
    this.$todoList = this.$todoListContainer.querySelector('.todo-list');
    this.$deleteBtn = this.$todoListContainer.querySelector('.clear-completed');
    this.bindDomEvents()
  }

  bindDomEvents() {
    this.$filter.addEventListener('click', this.changeSelection);
    this.$newTodo.addEventListener('keydown', this.handleCreateTodo);
    this.$deleteBtn.addEventListener('click', this.handleDeleteAllTodo);
  }

  handleDeleteAllTodo = async () => {
    try {
      await deleteAllTodoListOfTeamMember(this.teamId, this.memberId);
      this.user.clearTasks();
      this.render();
    } catch (err) {
      console.error(err);
    }
  }


  makePriorityTag(priority) {
    const priorityObj = {
      NONE: priorityHTML.NONE,
      FIRST: priorityHTML.FIRST,
      SECOND: priorityHTML.SECOND,
    };
    return priorityObj[priority];
  }

  handleCreateTodo = async (e, task = null) => {
    e.stopPropagation();
    if (e.key === 'Escape') {
      this.escapeEditMode(e.target);
      return;
    }
    if (e.key !== 'Enter') return;
    const contents = e.target.value.trim();
    e.target.value = '';
    if (contents.length < 2) {
      alert('2글자 이상 입력하세요!');
      return;
    }
    try {
      if (task) {
        await this.updateContent(task, contents);
      } else {
        await this.creteTodo(contents);
      }
      this.render();
    } catch (e) {
      console.error(e)
    }
  }

  async creteTodo(contents) {
    try {
      const resData = await addTodoItemOfTeamMember(this.teamId, this.memberId, contents);
      const task = Task.get(resData._id, contents);
      this.user.addTask(task);
    } catch (err) {
      console.error(err);
    }
  }

  async updateContent(task, contents) {
    try {
      await updateUserTodoContentsOfTeamMember(this.teamId, this.memberId, task.getInfo()._id, contents);
      task.setContent(contents);
      this.isEditMode = false;
    } catch (err) {
      console.error(err);
    }
  }

  async handleTodo(e, task) {
    e.stopPropagation();
    const {target} = e;
    if (target.classList.contains('edit')) {
      e.target.addEventListener('keydown', (e) => this.handleCreateTodo(e, task));
      return;
    }
    try {
      if (target.classList.contains('toggle')) {
        await toggleTodoItemOfTeamMember(this.teamId, this.memberId, task.getInfo()._id);
        task.toggle();
        this.render();
        return;
      }
      if (target.classList.contains('destroy')) {
        await deleteTodoItemOfTeamMember(this.teamId, this.memberId, task.getInfo()._id);
        this.user.removeTask(task);
        this.render();
      }
    } catch (err) {
      console.error(err);
    }
  }

  escapeEditMode(target) {
    target.closest('li') && target.closest('li').classList.remove('editing');
    this.isEditMode = false;
  }

  changeSelection = (e) => {
    if (e.target.tagName !== 'A') return;
    const targetClass = e.target.classList;
    const selection = this.user.getFilter();
    if (targetClass.contains(selection)) return;
    this.$filter.querySelector(`.${selection}`).classList.remove('selected');
    targetClass.add('selected');
    this.user.setFilter(targetClass[0]);
    this.render();
  }

  changeEditMode = (e) => {
    const isEditingMode = Boolean(!e.target.classList.contains('label') || this.isEditMode);
    if (isEditingMode) return;
    this.isEditMode = true;
    const li = e.target.closest('li');
    li.setAttribute('class', 'editing');
  }

  changeSelect = async (e, task) => {
    if (e.target.selectedIndex === 0) return;
    const priority = PRIORITY[e.target.selectedIndex];
    try {
      await updateTodoPriorityOfTeamMember(this.teamId, this.memberId, task.getInfo()._id, priority);
      task.setPriority(e.target.selectedIndex);
      this.render();
    } catch (err) {
      console.error(err);
    }
  }

  createTodoTask(task) {
    const {_id, priority, isCompleted} = task.getInfo();
    const li = document.createElement('li');
    li.classList.add('todo-list-item')
    li.classList.add(isCompleted && 'completed');
    li.dataset.id = _id;
    const priorHTML = this.makePriorityTag(priority);
    li.innerHTML = todoList.todoContent(task.getInfo(), priorHTML);
    li.addEventListener('click', (e) => this.handleTodo(e, task));
    li.addEventListener('dblclick', this.changeEditMode);
    li.querySelector('.chip').addEventListener('change', (e) => this.changeSelect(e, task));
    this.$todoList.appendChild(li);
  }


  render() {
    this.$todoList.innerHTML = '';
    const tasks = this.user.getTasks();
    tasks.forEach((task) => {
      this.createTodoTask(task);
    });
    this.$todoCount.innerHTML = tasks.length;
    const isTodoList = this.el.querySelector(`li[data-id="${this.memberId}"]`)
    if (isTodoList === null) {
      this.el.appendChild(this.$todoListContainer);
      return;
    }
    isTodoList.replaceWith(this.$todoListContainer);
  }
}

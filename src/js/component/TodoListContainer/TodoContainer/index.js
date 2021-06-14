import api from '../../../api/index.js';
import Title from '../../Title.js';
import TodoInput from './TodoInput.js'
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';

export default function TodoContainer(parent) {
  this.$parent = parent;
  this.dom = {};
  this.member = {};
  this.memberTitle = {};
  this.teamId = '';
  this.todoInput = {};
  this.$todoApp = {};
  this.todoList = {};
  this.todoCount = {};

  this.setDom = () => {
    this.dom = document.createElement('li')
    this.$todoApp = document.createElement('div');
    this.dom.classList.add('todoapp-container');
    this.$todoApp.classList.add('todoapp');
    this.$parent.prepend(this.dom);
    this.dom.prepend(this.$todoApp);
  }

  this.load = async () => {
    this.member =  await api.todo.getList(this.teamId, this.memberId);
    console.log(this.member);
  } 

  this.setState = async (memberId, teamId) => {
    this.memberId = memberId;
    this.teamId = teamId;
    await this.load();
    this.setDom();
    this.drawComponent();
    this.memberTitle.setState(this.member.name);
    this.todoInput.setState();
    this.todoList.setState(this.member.todoList);
    this.todoCount.setState(this.member.todoList.length);
  }

  this.update = async () => {
    this.$todoApp.innerHTML = '';
    await this.load();
    this.todoInput.setState();
    this.todoList.setState(this.member.todoList);
  }

  this.drawComponent = () => {
    this.memberTitle = new Title(this.dom, 'h2', this.memberId);
    this.todoInput = new TodoInput(
      this.$todoApp,
      {
        onAdd: async(contents) => {
          console.log(this.teamId);
          console.log(this.member._id);
          await api.todo.add(this.teamId, this.memberId, {contents})
          this.update();
        },
      }
    );
    this.todoList = new TodoList(
      this.$todoApp,
      {
        onDelete: async (itemId) => {
          await api.todo.delete(this.teamId, this.memberId, itemId);
          this.update();
        },
        onToggle: async (itemId, isCompleted) => {
          isCompleted = !isCompleted;
          await api.todo.toggle(this.teamId, this.memberId, itemId, {isCompleted});
          this.update()
        },
        onEdit: async (contents, itemId) => {
          await api.todo.update(this.teamId, this.memberId, itemId, {contents});
          this.update();
        },
      }
    );
    this.todoCount = new TodoCount(this.$todoApp);
      
  }

}
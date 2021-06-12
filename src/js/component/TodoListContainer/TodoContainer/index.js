import api from '../../../api/index.js';
import Title from '../../Title.js';
import TodoInput from './TodoInput.js'
import TodoList from './TodoList.js';

export default function TodoContainer(parent) {
  this.$parent = parent;
  this.dom = {};
  this.member = {};
  this.memberTitle = {};
  this.teamId = '';
  this.todoInput = {};
  this.$todoApp = {};
  this.todoList = {};

  this.setDom = () => {
    this.dom = document.createElement('li')
    this.$todoApp = document.createElement('div');
    this.dom.classList.add('todoapp-container');
    this.$todoApp.classList.add('todoapp');
    this.$parent.prepend(this.dom);
    this.dom.prepend(this.$todoApp);
  }

  this.setState = (member, id) => {
    this.member = member;
    this.teamId = id;
    this.setDom();
    console.log(this.member);
    this.drawComponent();
    this.memberTitle.setState(this.member.name);
    this.todoInput.setState()
    this.todoList.setState(this.member.todoList);
  }

  this.drawComponent = () => {
    this.memberTitle = new Title(this.dom, 'h2', this.member._id);
    this.todoInput = new TodoInput(
      this.$todoApp,
      {
        onAdd: async(value) => {
          await api.todo.add(this.teamId, member._id, {value})
        }
      }
    );
    this.todoList = new TodoList(this.$todoApp);  
  }

}
import api from '../../../api/index.js';
import Title from '../../Title.js';
import TodoInput from './TodoInput.js'
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';
import TodoFilters from './TodoFilters.js';

export default function TodoContainer(parent) {
  this.$parent = parent;
  this.dom = {};
  this.$countCountainer = {};
  this.$sectionMain = {};

  this.member = {};
  this.memberTitle = {};
  this.memberTodoList = [];
  this.teamId = '';
  this.todoInput = {};
  this.$todoApp = {};
  this.todoList = {};
  this.todoCount = {};
  this.todoFilters = {};
  
  this.setDom = () => {
    this.dom = document.createElement('li')
    this.$todoApp = document.createElement('div');
    this.$sectionMain = document.createElement('section');
    this.$countCountainer = document.createElement('div');

    
    this.dom.className = 'todoapp-container';
    this.$todoApp.className = 'todoapp';
    this.$sectionMain.className = 'main';
    this.$countCountainer.className = 'count-container';
    

    this.$parent.prepend(this.dom);
    this.dom.prepend(this.$todoApp);
    this.$todoApp.prepend(this.$sectionMain);
    this.$todoApp.append(this.$countCountainer);
  }

  this.load = async () => {
    this.member =  await api.todo.getList(this.teamId, this.memberId);
    this.memberTodoList = this.member.todoList ?? [];
  } 

  this.setState = async (memberId, teamId) => {
    this.memberId = memberId;
    this.teamId = teamId;
    await this.load();
    this.setDom();
    await this.drawComponent();
    this.memberTitle.setState(this.member.name);
    this.todoInput.setState();
    this.todoList.setState(this.memberTodoList);
    this.todoCount.setState(this.memberTodoList.length);
    this.todoFilters.setState();
  }

  this.update = async () => {
    this.$sectionMain.innerHTML = '';
    this.$countCountainer.innerHTML = '';
    this.todoList.setState(this.memberTodoList);
    this.todoCount.setState(this.memberTodoList.length);
    this.todoFilters.setState();
  }

  this.drawComponent = async () => {
    this.memberTitle = new Title(this.dom, 'h2', this.memberId);

    this.todoFilters = new TodoFilters(
      this.$countCountainer,
      {
        onShowAll: async () => {
          await this.load();
          this.update();
        },
        onActive: async() => {
          this.member =  await api.todo.getList(this.teamId, this.memberId);
          this.memberTodoList = this.member.todoList.filter( item => !item.isCompleted);
          this.update();
        },
        onCompleted: async () => {
          this.member =  await api.todo.getList(this.teamId, this.memberId);
          this.memberTodoList = this.member.todoList.filter( item => item.isCompleted);
          this.update();
        },
      }
      );

    this.todoList = new TodoList(
      this.$sectionMain,
      {
        onDelete: async (itemId) => {
          await api.todo.delete(this.teamId, this.memberId, itemId);
          await this.load();
          this.update();
        },
        onToggle: async (itemId, isCompleted) => {
          isCompleted = !isCompleted;
          await api.todo.toggle(this.teamId, this.memberId, itemId, {isCompleted});
          await this.load();
          this.update();
        },
        onEdit: async (contents, itemId) => {
          await api.todo.update(this.teamId, this.memberId, itemId, {contents});
          await this.load();
          this.update();
        },
      }
    );
    
    this.todoInput = new TodoInput(
      this.$todoApp,
      {
        onAdd: async(contents) => {
          await api.todo.add(this.teamId, this.memberId, {contents})
          await this.load();
          this.update();
        },
      }
    );


    this.todoCount =  new TodoCount(this.$countCountainer);
      
  }

}
import TodoListContainer from './TodoListContainer/TodoMain.js';

export default function TeamTodoApp() {
  this.$app = document.querySelector('#app');
  this.todoListContainer = {};

  this.init = async () => {
    await this.drawComponent();
    this.render();
  }

  this.setState = async () => {
    this.todoListContainer.setState()
  }

  this.drawComponent = () => {
    this.todoListContainer = new TodoListContainer(this.$app, 'ul');
  }

  this.render = () => {
    this.todoListContainer.render();
  }

}
  
new TeamTodoApp().init();
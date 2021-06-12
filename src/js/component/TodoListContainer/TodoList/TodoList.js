import team from '../../../store/team.js';

function TodoList(parent) {
  this.$parent = parent;
  this.$todoList = document.createElement('li');
  this.$todoList.classList.add('todoapp-container');
  this.$parent.prepend(this.$todoList);
  
  this.members = {};

  this.setState = async () => {
    const selectedTeam = await team.getSelected();
    console.log(selectedTeam);
    this.members = selectedTeam.members;
    console.log(this.members);
  }

  
}

export default TodoList;

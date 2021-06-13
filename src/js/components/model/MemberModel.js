class MemberModel {
  constructor({ id, name, todoList }) {
    this.id = id;
    this.name = name;
    this.todoList = todoList;
    this.filter = "all";
  }
}

export default MemberModel;

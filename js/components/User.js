import Task from './Task.js';

const User = class extends Set {
  constructor(_id, name, filter = 'all') {
    super();
    this._id = _id;
    this.name = name;
    this.filter = filter;
  }

  static get(id, name) {
    return new User(id, name);
  }

  static load(json) {
    const user = new User(json._id, json.name);
    if(json.todoList instanceof Array){
      json.todoList.forEach((t) => {
        user.addTask(Task.load(t));
      });
    }

    return user;
  }

  setFilter(filter) {
    this.filter = filter;
  }

  getFilter() {
    return this.filter;
  }

  addTask(task) {
    if (!(task instanceof Task)) return console.log('invalid task');
    super.add(task);
  }

  removeTask(task) {
    if (!(task instanceof Task)) return console.log('invalid task');
    super.delete(task);
  }

  clearTasks() {
    super.clear();
  }

  getTasks() {
    const tasks = [...super.values()];
    if (this.filter === 'active') return tasks.filter((todo) => !todo.isCompleted);
    if (this.filter === 'completed') return tasks.filter((todo) => todo.isCompleted);
    return tasks;
  }

  getInfo() {
    const {_id, name, filter} = this;
    return {_id, name, filter};
  }

  add() {}

  delete() {}

  clear() {}

  values() {}
};

export default User;

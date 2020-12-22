import {PRIORITY} from '../util/request.js';

const Task = class {
  constructor(id, contents, priority = 'NONE', isCompleted = false) {
    this._id = id;
    this.contents = contents;
    this.priority = priority;
    this.isCompleted = isCompleted;
  }

  static get(id, contents) {
    return new Task(id, contents);
  }

  static load(json) {
    return new Task(json._id, json.contents, json.priority, json.isCompleted);
  }

  setContent(contents) {
    this.contents = contents;
  }

  setPriority(value) {
    this.priority = PRIORITY[value];
  }

  toggle() {
    this.isCompleted = !this.isCompleted;
  }

  getInfo() {
    const {_id, contents, priority, isCompleted} = this;
    return {_id, contents, priority, isCompleted};
  }
};
export default Task;

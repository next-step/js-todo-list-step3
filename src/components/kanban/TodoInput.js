import { DOM_ID, KEY, MESSAGGE } from '@constants/constants.js';
import { $, isEmptyObject } from '@utils/utils.js';
// import { todoListService } from '@api/todolist.js';

// import teamState from '@store/teamState.js';
// import memberState from '@store/membersState.js';

export default class TodoInput {
  constructor() {
    this.$target = $(DOM_ID.TODO_INPUT);

    console.log(this.$target);

    <section class="input-container">
      <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
    </section>;

    this.addEvent();
  }

  addEvent() {
    this.$target.addEventListener('keypress', this.addTodo.bind(this));
  }

  async addTodo({ code }) {
    if (code !== KEY.ENTER) return;

    const todoContents = this.$target.value;
    if (todoContents.length < 2) {
      alert(MESSAGGE.CREATE_CONTENTS_VALIDATE_ERROR);
      return;
    }

    // const { userId } = this.userState.get();
    // const result = await todoListService.createTodoItem(userId, { contents: todoContents });
    // if (isEmptyObject(result)) return;

    // // 상태 업데이트
    // const prevTodoList = this.todoState.get();
    // const addedTodoList = prevTodoList.concat(result);
    // this.todoState.set(addedTodoList);

    this.initInput();
  }

  initInput() {
    this.$target.value = '';
  }
}

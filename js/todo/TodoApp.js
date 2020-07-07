import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';
import TodoFilter from './TodoFilter.js';
import rootApi from '../api/rootApi.js';
import { ERROR_TYPE_MESSAGE } from '../utils/constants.js';
import DragAndDropApp from '../utils/DragAndDrop.js';

export default class TodoApp {
  constructor({
    data,
    teamId,
    memberId,
    $targetTodoApp,
    $targetNewTodo,
    $targetTodoList,
    $targetCountContainer,
    $targetTodoCount,
    $targetFilter,
  }) {
    this.data = data;
    this.teamId = teamId;
    this.memberId = memberId;
    this.$targetTodoApp = $targetTodoApp;
    this.$targetNewTodo = $targetNewTodo;
    this.$targetTodoList = $targetTodoList;
    this.$targetCountContainer = $targetCountContainer;
    this.$targetTodoCount = $targetTodoCount;
    this.$targetFilter = $targetFilter;

    const test = new DragAndDropApp({
      draggableItemClass: '.todo-list-item',
      dragItemsWrapperList: '.todo-list',
    });

    this.todoInput = new TodoInput({
      data,
      $targetNewTodo,
      onAddTodoItem: async (contents) => {
        try {
          const newTodoItem = await rootApi.fetchMemberAddTodoItem(
            this.teamId,
            this.memberId,
            contents,
          );
          this.setState([...this.data, newTodoItem]);
        } catch (e) {
          console.error();
        }
      },
    });

    this.todoList = new TodoList({
      data,
      filteredData: [],
      $targetTodoList,
      onToggleTodoItem: async (itemId) => {
        try {
          const toggledTodoItem = await rootApi.fetchToggleTodoItem(
            this.teamId,
            this.memberId,
            itemId,
          );
          const index = this.data.findIndex(
            (todo) => todo._id === toggledTodoItem._id,
          );
          const nextData = [...this.data];
          nextData[index] = toggledTodoItem;
          this.setState(nextData);
        } catch (e) {
          console.error(ERROR_TYPE_MESSAGE.CAN_NOT_TOGGLE);
        }
      },
      onDeleteTodoItem: async (itemId) => {
        try {
          await rootApi.fetchDeleteTodoItem(this.teamId, this.memberId, itemId);
          const index = this.data.findIndex((todo) => todo._id === itemId);
          const nextData = [...this.data];
          nextData.splice(index, 1);
          this.setState(nextData);
        } catch (e) {
          console.error(ERROR_TYPE_MESSAGE.CAN_NOT_DELETE);
        }
      },
      onUpdateTodoItem: async (itemId, contents) => {
        try {
          const updatedTodoItem = await rootApi.fetchUpdateTodoItem(
            this.teamId,
            this.memberId,
            itemId,
            contents,
          );
          const index = this.data.findIndex(
            (todo) => todo._id === updatedTodoItem._id,
          );
          const nextData = [...this.data];
          nextData[index] = updatedTodoItem;
          this.setState(nextData);
        } catch (e) {
          console.error(ERROR_TYPE_MESSAGE.CAN_NOT_UPDATE);
        }
      },
      onPriorityTodoItem: async (itemId, priority) => {
        try {
          const setPriorityTodoItem = await rootApi.fetchPriorityTodoItem(
            this.teamId,
            this.memberId,
            itemId,
            priority,
          );
          const index = this.data.findIndex(
            (todo) => todo._id === setPriorityTodoItem._id,
          );
          const nextData = [...this.data];
          nextData[index] = setPriorityTodoItem;
          this.setState(nextData);
        } catch (e) {
          console.error(ERROR_TYPE_MESSAGE.CAN_NOT_SET_PRIORITY);
        }
      },
    });

    this.todoCount = new TodoCount({
      data,
      filteredData: [],
      $targetTodoCount,
    });

    this.todoFilter = new TodoFilter({
      data,
      $targetCountContainer,
      $targetFilter,
      onDeleteAllTodoItems: async () => {
        try {
          await rootApi.fetchDeleteAllTodoItems(this.teamId, this.memberId);
          this.setState([]);
        } catch (e) {
          console.error(ERROR_TYPE_MESSAGE.CAN_NOT_DELETE_ALL);
        }
      },
      onSelectFilter: async () => {
        try {
          const { todoList } = await rootApi.fetchMemberTodoList(
            this.teamId,
            this.memberId,
          );
          this.setState(todoList);
        } catch (e) {
          console.error(ERROR_TYPE_MESSAGE.CAN_NOT_LOAD);
        }
      },
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.todoList.setState(nextData);
    this.todoCount.setState(nextData);
  }
}

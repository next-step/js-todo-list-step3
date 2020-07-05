import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';
import TodoFilter from './TodoFilter.js';
import rootApi from '../api/apiHandler.js';
import { FILTER_NAME, ERROR_TYPE } from '../util/constants.js';

export default class TodoApp {
  constructor({
    data,
    teamId,
    memberId,
    $targetTodoApp,
    $targetNewTodo,
    $targetTodoList,
    $targetTodoCount,
    $targetFilters,
  }) {
    this.data = data;
    this.teamId = teamId;
    this.memberId = memberId;
    this.$targetTodoApp = $targetTodoApp;
    this.$targetNewTodo = $targetNewTodo;
    this.$targetTodoList = $targetTodoList;
    this.$targetTodoCount = $targetTodoCount;
    this.$targetFilters = $targetFilters;

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
      $targetFilters,
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
          let nextData = [...this.data];
          nextData[index] = toggledTodoItem;
          this.setState(nextData);
        } catch (e) {
          console.error(ERROR_TYPE.CAT_NOT_TOGGLE);
        }
      },
      onDeleteTodoItem: async (itemId) => {
        try {
          await rootApi.fetchDeleteTodoItem(this.teamId, this.memberId, itemId);
          const index = this.data.findIndex((todo) => todo._id === itemId);
          let nextData = [...this.data];
          nextData.splice(index, 1);
          this.setState(nextData);
        } catch (e) {
          console.error(ERROR_TYPE.CAT_NOT_DELETE);
        }
      },
      onUpdateTodoItem: async (itemId, contents) => {
        const updatedTodoItem = await rootApi.fetchUpdateTodoItem(
          this.teamId,
          this.memberId,
          itemId,
          contents,
        );
        const index = this.data.findIndex(
          (todo) => todo._id === updatedTodoItem._id,
        );
        let nextData = [...this.data];
        nextData[index] = updatedTodoItem;
        this.setState(nextData);
      },
      onPriorityTodoItem: async (itemId, priority) => {
        const setPriorityTodoItem = await rootApi.fetchPriorityTodoItem(
          this.teamId,
          this.memberId,
          itemId,
          priority,
        );
        const index = this.data.findIndex(
          (todo) => todo._id === setPriorityTodoItem._id,
        );
        let nextData = [...this.data];
        nextData[index] = setPriorityTodoItem;
        this.setState(nextData);
      },
    });

    this.todoCount = new TodoCount({
      
    })
  }

  setState(nextData) {
    this.data = nextData;
    this.todoList.setState(nextData);
  }
}

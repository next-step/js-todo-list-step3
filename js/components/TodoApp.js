import TodoInput from './TodoInput.js'
import TodoList from './TodoList.js'
import TodoCount from './TodoCount.js'
import TodoStatus from './TodoStatus.js'
import TodoDeleteAll from './TodoDeleteAll.js'
import { todoStatus } from '../utils/constant.js'
import { api } from '../api/api.js'
import { validateNewInstance, validateElement } from '../utils/validator.js'

export default function TodoApp({
  teamId,
  memberId,
  username,
  todoList,
  $todoInput,
  $todoList,
  $todoCount,
  $todoStatus,
  $todoDeleteAll,
}) {
  validateNewInstance(new.target, TodoApp)

  validateElement($todoInput)
  validateElement($todoList)
  validateElement($todoCount)
  validateElement($todoStatus)
  validateElement($todoDeleteAll)

  const onAddTodo = async (text) => {
    await api.addTodo(this.teamId, this.memberId, { contents: text })
    this.setState(this.username)
  }

  const findIndexById = (_id) =>
    this.todos.findIndex((todos) => todos._id === _id)

  const onToggleTodo = async (_id) => {
    const index = findIndexById(_id)

    await api.toggleTodo(this.teamId, this.memberId, _id)
    this.todos[index].isCompleted = !this.todos[index].isCompleted
    this.setState(this.username)
  }

  const onDeleteTodo = async (_id) => {
    const index = findIndexById(_id)

    await api.removeTodo(this.teamId, this.memberId, _id)
    this.todos.splice(index, 1)
    this.setState(this.username)
  }

  const onChangeTodo = async (text, _id) => {
    const index = findIndexById(_id)

    await api.changeTodo(this.teamId, this.memberId, _id, { contents: text })
    this.todos[index].contents = text
    this.setState(this.username)
  }

  const onChangeTodoPriority = async (_id, priority) => {
    const index = findIndexById(_id)

    await api.changeTodoPriority(teamId, memberId, _id, { priority })
    this.todos[index].priority = priority
    this.setState(this.username)
  }

  const onSetTodoStatus = (status) => {
    this.todoViewStatus = status
    this.setState(this.username)
  }

  const onDeleteAll = async () => {
    this.todos = []
    await api.removeAllTodoList(this.teamId, this.memberId)
    this.setState(this.username)
  }

  const filteredTodosByStatus = (status) => {
    const filteredTodos = {
      [todoStatus.ALL]: this.todos,
      [todoStatus.ACTIVE]: this.todos.filter((todo) => !todo.isCompleted),
      [todoStatus.COMPLETED]: this.todos.filter((todo) => todo.isCompleted),
    }

    return filteredTodos[status]
  }

  this.setState = async function (username) {
    this.username = username

    const user = await api.getTodoList(this.teamId, this.memberId)
    if (!user.hasOwnProperty('todoList')) {
      user.todoList = []
    }
    this.todos = user.todoList

    this.filteredTodos = filteredTodosByStatus(this.todoViewStatus)
    this.todoList.setState(this.filteredTodos)
    this.todoCount.setState(this.filteredTodos)
    this.todoStatus.setState(this.todoViewStatus)
  }

  this.init = function () {
    this.teamId = teamId
    this.memberId = memberId
    this.username = username

    this.todos = todoList
    this.filteredTodos = []
    this.todoViewStatus = todoStatus.ALL

    this.$todoInput = $todoInput
    this.$todoList = $todoList
    this.$todoCount = $todoCount
    this.$todoStatus = $todoStatus
    this.$todoDeleteAll = $todoDeleteAll

    try {
      this.todoInput = new TodoInput({
        $target: this.$todoInput,
        onAddTodo,
      })

      this.todoList = new TodoList({
        data: this.todos,
        $target: this.$todoList,
        onToggleTodo,
        onDeleteTodo,
        onChangeTodo,
        onChangeTodoPriority,
      })

      this.todoCount = new TodoCount({
        data: this.todos,
        $target: this.$todoCount,
      })

      this.todoStatus = new TodoStatus({
        $target: this.$todoStatus,
        onSetTodoStatus,
      })

      this.todoDeleteAll = new TodoDeleteAll({
        $target: this.$todoDeleteAll,
        onDeleteAll,
      })
    } catch (err) {
      console.log(err)
    }
    this.setState(this.username)
  }

  this.init()
}

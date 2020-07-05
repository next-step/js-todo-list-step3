import {
  TodoInput,
  TodoList,
  TodoCount,
  TodoFilter,
  TodoHeader,
  Loading,
} from '../components/todo/index.js'
import { FILTER_STATUS, CLASS_NAME } from '../utils/constants.js'
import { todoHeaderTemplate } from '../utils/templates.js'
import todoApis from '../api/todoApis.js'

const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms))

const getTodoHash = (todos) => {
  return {
    [FILTER_STATUS.ALL]: todos,
    [FILTER_STATUS.ACTIVE]: todos.filter(({ isCompleted }) => !isCompleted),
    [FILTER_STATUS.COMPLETED]: todos.filter(({ isCompleted }) => isCompleted),
  }
}

export default function TodoContainer(props) {
  if (new.target !== TodoContainer) {
    return new TodoContainer(props)
  }
  const { name: userName, _id: memberId, teamId, todoList, selector } = props

  this.init = async () => {
    const { getTodos, onFilter } = this
    this.todos = []
    this.todoHash = {
      [FILTER_STATUS.ALL]: this.todos,
      [FILTER_STATUS.ACTIVE]: [],
      [FILTER_STATUS.COMPLETED]: [],
    }
    this.filterStatus = FILTER_STATUS.ALL

    this.$target = document.querySelector(selector)
    const $fragment = document.createDocumentFragment() // $target에 append하기 전 fragment에 모두 뭉침

    const $todoAppContainer = document.createElement('li')
    $todoAppContainer.className = 'todoapp-container'

    // TodoHeader
    const $todoHeaderContainer = document.createElement('h2')
    this.$header = new TodoHeader({
      $target: $todoHeaderContainer,
      textContent: todoHeaderTemplate(userName),
    })
    $fragment.appendChild($todoHeaderContainer)

    const $todoApp = document.createElement('div')
    $todoApp.className = 'todoApp'

    //TodoInput
    this.$todoInput = new TodoInput({
      $target: this.$target,
      teamId,
      memberId,
      getTodos,
    })

    this.$target.appendChild($fragment)

    // this.$todoList = new TodoList({
    //   selector: '.todo-list',
    //   todos: this.todos,
    //   username: this.username,
    //   getTodos,
    // })

    // this.$todoCount = new TodoCount({
    //   selector: '.todo-counter',
    //   totalCount: this.todos.length,
    //   completedCount: this.todos.filter(({ isCompleted }) => isCompleted)
    //     .length,
    // })

    // new TodoFilter({
    //   selector: '.filters',
    //   onFilter,
    // })

    // this.$loading = new Loading({
    //   selector: '.todo-list',
    // })

    // this.$removeAllBtn = document.querySelector(`.${CLASS_NAME.REMOVE_ALL}`)
    // this.$removeAllBtn.addEventListener('click', this.onDeleteAll)

    // this.getTodos()
  }

  this.onFilter = (status) => {
    this.filterStatus = status
    this.setState()
  }

  this.setState = () => {
    const renderTodos = this.todoHash[this.filterStatus]
    this.$todoList.setState(this.username, renderTodos)
    this.$todoCount.setState(
      renderTodos.length,
      renderTodos.filter(({ isCompleted }) => isCompleted === true).length
    )
  }

  this.getTodos = async () => {
    this.$loading.render() // loading on
    // await delay(500) // delay 주고 싶다면 추가
    try {
      const { todoList } = await todoApis.getTodos(this.username)
      this.todos = todoList ? todoList : []
      this.todoHash = getTodoHash(this.todos)
      this.setState()
    } catch (e) {
      console.error(e)
      this.todos = [] // 없는 유저인 경우
      this.setState()
    }
  }

  this.onDeleteAll = async () => {
    try {
      await todoApis.deleteTodoAll(this.username)
      this.getTodos()
    } catch (e) {
      console.error(e)
    }
  }

  this.init()
}

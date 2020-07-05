import {
  TodoInput,
  TodoList,
  TodoCount,
  TodoFilter,
  TodoHeader,
  Loading,
  RemoveAllButton,
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
    $todoAppContainer.appendChild($todoHeaderContainer)

    /* TodoApp Element Start */
    const $todoApp = document.createElement('div')
    $todoApp.className = 'todoapp'

    // TodoInput
    const $todoInputContainer = document.createElement('section')
    $todoInputContainer.className = 'input-container'
    this.$todoInput = new TodoInput({
      $target: $todoInputContainer,
      teamId,
      memberId,
      getTodos,
    })
    $todoApp.appendChild($todoInputContainer)

    // TodoList
    const $mainSection = document.createElement('section')
    $mainSection.className = 'main'
    const $ul = document.createElement('ul')
    $ul.className = 'todo-list'
    this.$todoList = new TodoList({
      $target: $ul,
      todos: todoList,
      teamId,
      memberId,
      getTodos,
    })
    $mainSection.appendChild($ul)
    $todoApp.appendChild($mainSection)

    // TodoCount
    const $countContainer = document.createElement('div')
    $countContainer.className = 'count-container'

    this.$todoCount = new TodoCount({
      $target: $countContainer,
      totalCount: todoList.length,
      completedCount: todoList.filter(({ isCompleted }) => isCompleted).length,
    })

    // TodoFilter
    const $filterUl = document.createElement('ul')
    $filterUl.className = 'filters'
    new TodoFilter({
      $target: $filterUl,
      onFilter,
    })
    $countContainer.appendChild($filterUl)

    // RemoveAllButton
    new RemoveAllButton({
      $target: $countContainer,
    })

    $todoApp.appendChild($countContainer)
    /* TodoApp Element End */
    $todoAppContainer.appendChild($todoApp)
    $fragment.appendChild($todoAppContainer)
    this.$target.appendChild($fragment)

    // this.$loading = new Loading({
    //   selector: '.todo-list',
    // })

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

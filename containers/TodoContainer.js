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
import memberApis from '../api/member.js'

const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms))
const getTodoHash = (todos) => {
  const copyTodos = [...todos] // sort()로 인한 불변성 깨짐방지.
  return {
    [FILTER_STATUS.ALL]: todos,
    [FILTER_STATUS.PRIORITY]: copyTodos.sort(
      (a, b) => Number(a.priority) - Number(b.priority)
    ),
    [FILTER_STATUS.ACTIVE]: todos.filter(({ isCompleted }) => !isCompleted),
    [FILTER_STATUS.COMPLETED]: todos.filter(({ isCompleted }) => isCompleted),
  }
}
TodoContainer.prototype.init = function () {
  const {
    selector,
    memberName,
    teamId,
    memberId,
    todoList,
    getTodos,
    onFilter,
  } = this

  this.$target = document.querySelector(selector)
  const $fragment = document.createDocumentFragment() // $target에 append하기 전 fragment에 모두 뭉침

  const $todoAppContainer = document.createElement('li')
  $todoAppContainer.className = 'todoapp-container'

  // TodoHeader
  const $todoHeaderContainer = document.createElement('h2')
  this.$header = new TodoHeader({
    $target: $todoHeaderContainer,
    textContent: todoHeaderTemplate(memberName),
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
    todoList,
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
    teamId,
    memberId,
    getTodos,
  })
  $todoApp.appendChild($countContainer)
  /* TodoApp Element End */
  $todoAppContainer.appendChild($todoApp)
  $fragment.appendChild($todoAppContainer)
  this.$target.appendChild($fragment)

  // this.$loading = new Loading({
  //   selector: '.todo-list',
  // })
  this.getTodos()
}
TodoContainer.prototype.setState = function () {
  console.log('status', this.filterStatus)
  const renderTodos = this.todoHash[this.filterStatus]
  this.$todoList.setState(renderTodos)
  this.$todoCount.setState(
    renderTodos.length,
    renderTodos.filter(({ isCompleted }) => isCompleted === true).length
  )
}

export default function TodoContainer(props) {
  if (new.target !== TodoContainer) {
    return new TodoContainer(props)
  }
  const { name: memberName, _id: memberId, teamId, todoList, selector } = props

  this.memberId = memberId
  this.memberName = memberName
  this.teamId = teamId
  this.todoList = todoList
  this.selector = selector
  this.filterStatus = FILTER_STATUS.ALL

  TodoContainer.prototype.getTodos = async () => {
    // this 를 TodoContainer에 바인딩하기 위해 TodoCounter 안에서 '=>' 사용
    // this.$loading.render() // loading on
    // await delay(500) // delay 주고 싶다면 추가
    try {
      const { todoList } = await memberApis.getMemberTodos(
        this.teamId,
        this.memberId
      )
      this.todoList = todoList ? todoList : []
    } catch (e) {
      console.error(e)
      this.todoList = []
    }
    this.todoHash = getTodoHash(this.todoList)
    this.setState()
  }

  TodoContainer.prototype.onFilter = (status) => {
    this.filterStatus = status
    this.setState()
  }

  this.init()
}

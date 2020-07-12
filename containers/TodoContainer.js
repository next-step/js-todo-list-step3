import {
  TodoInput,
  TodoList,
  TodoCount,
  TodoFilter,
  Loading,
  RemoveAllButton,
} from '../components/todo/index.js'
import { FILTER_STATUS, CLASS_NAME } from '../utils/constants.js'
import memberApis from '../api/member.js'

TodoContainer.prototype.init = function () {
  const { memberId, todoList, teamId, getTodos, onFilter } = this

  this.$target = document.querySelector(`#${memberId}`)

  this.$todoInput = new TodoInput({
    $target: this.$target.querySelector(`.${CLASS_NAME.TODO_INPUT}`),
    teamId,
    memberId,
    getTodos,
  })

  this.$todoList = new TodoList({
    $target: this.$target.querySelector(`.${CLASS_NAME.TODO_LIST}`),
    todoList,
    teamId,
    memberId,
    getTodos,
  })

  this.$todoCount = new TodoCount({
    $target: this.$target.querySelector(`.${CLASS_NAME.TODO_COUNT_CONTAINER}`),
    totalCount: todoList.length,
    completedCount: todoList.filter(({ isCompleted }) => isCompleted).length,
  })

  new TodoFilter({
    $target: this.$target.querySelector(`.${CLASS_NAME.TODO_FILTERS}`),
    onFilter,
  })

  new RemoveAllButton({
    $target: this.$target.querySelector(`.${CLASS_NAME.REMOVE_ALL}`),
    teamId,
    memberId,
    getTodos,
  })

  // this.$loading = new Loading({
  //   selector: '.todo-list',
  // })
  this.getTodos()
}

TodoContainer.prototype.getTodoHash = (todos) => {
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

TodoContainer.prototype.setState = function () {
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
  const { _id: memberId, todoList, teamId } = props

  this.memberId = memberId
  this.todoList = todoList
  this.teamId = teamId
  this.filterStatus = FILTER_STATUS.ALL

  TodoContainer.prototype.getTodos = async () => {
    // this 를 TodoContainer에 바인딩하기 위해 TodoCounter 안에서 '=>' 사용
    // this.$loading.render() // loading on
    try {
      const { todoList } = await memberApis.getMemberTodos(
        this.teamId,
        this.memberId
      )
      this.todoList = todoList || []
    } catch (e) {
      this.todoList = []
    }
    this.todoHash = this.getTodoHash(this.todoList)
    this.setState()
  }

  TodoContainer.prototype.onFilter = (status) => {
    this.filterStatus = status
    this.setState()
  }

  this.init()
}

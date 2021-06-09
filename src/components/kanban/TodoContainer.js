import Priority from '../../constant/Priority.js'
import Component from '../../core/Component/Component.js'
import Filter from '../../constant/TodoFilter.js'
import Keyboard from '../../constant/Keyboard.js'
import Event from '../../constant/Event.js'
import { store } from '../../modules/store/kanban.js'
import Observable from '../../core/Observer/Observable.js'
import {
  addMember,
  cancelEditing,
  changeFilter,
  createTodo,
  deleteTodo,
  deleteTodos,
  editComplete,
  editTodo,
  priorityTodo,
  toggleTodo,
} from '../../modules/todos/creator.js'
import TodoConnector from '../../utils/connector/TodoConnector.js'
import {
  ADD_MEMBER,
  CREATE_TODO,
  DELETE_TODO,
  DELETE_TODOS,
  EDIT_COMPLETE,
  TOGGLE_TODO,
} from '../../modules/todos/actions.js'
import { loadingEnd, loadingStart } from '../../modules/common/creator.js'
import {
  validationTodoContents,
  validationUserName,
} from '../../utils/dom/index.js'

const UserTitle = (name) => {
  return `
    <h2>
      <span><strong>${name}</strong>'s Todo List</span>
    </h2>
  `
}

const TodoInput = () => {
  return `
    <section class="input-container">
      <input
        class="new-todo"
        placeholder="할 일을 입력해주세요."
        autofocus
        data-action=${CREATE_TODO}
      />
    </section>
  `
}

const actions = {
  EDIT_TODO: 'EDIT_TODO',
  SHOW_ALL: 'SHOW_ALL',
  SHOW_PRIORITY: 'SHOW_PRIORITY',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
}

const clickEvents = [
  actions.SHOW_ALL,
  actions.SHOW_PRIORITY,
  actions.SHOW_ACTIVE,
  actions.SHOW_COMPLETED,
  TOGGLE_TODO,
  DELETE_TODO,
  DELETE_TODOS,
  ADD_MEMBER,
]

const TodoItem = ({
  _id,
  contents,
  priority,
  isCompleted,
  isEditing = false,
}) => {
  return `
    <li class="todo-list-item ${isCompleted && 'completed'}  
    ${isEditing ? 'editing' : ''}" data-todo=${_id}>
      <div class="view">
        <input class="toggle" type="checkbox" ${
          isCompleted ? 'checked' : ''
        } data-action=${TOGGLE_TODO} />
        <label class="label" data-action=${actions.EDIT_TODO}>
          <div class="chip-container">
          ${
            priority !== Priority.NONE
              ? `<span class="chip ${getLabelColor(
                  priority
                )}">${getLabelContents(priority)}순위</span>`
              : ''
          }
            <select class="chip select ${
              priority === Priority.NONE ? '' : 'hidden'
            }">
              <option value="${Priority.NONE}" selected>순위</option>
              <option value="${Priority.FIRST}">1순위</option>
              <option value="${Priority.SECOND}">2순위</option>
            </select>
          </div>
          ${contents}
        </label>
        <button class="destroy" data-action=${DELETE_TODO}></button>
      </div>
      <input class="edit" value='${contents}' 
      data-action=${EDIT_COMPLETE} data-value=${contents} />
    </li>
  `
}

function changePriorityToNumber(priority) {
  if (priority === Priority.NONE) {
    return 3
  }

  if (priority === Priority.FIRST) {
    return 1
  }
  if (priority === Priority.SECOND) {
    return 2
  }

  return Infinity
}

function diffPriority(todo1, todo2) {
  const priority1 = changePriorityToNumber(todo1.priority)
  const priority2 = changePriorityToNumber(todo2.priority)

  return priority1 > priority2 ? 1 : -1
}

const TodoList = ({ _id, name, todoList = [], filter = Filter.ALL }) => {
  const filteredTodoList = []

  switch (filter) {
    case Filter.ACTIVE:
      todoList = todoList.filter((todo) => !todo.isCompleted)
      break

    case Filter.COMPLETE:
      todoList = todoList.filter((todo) => todo.isCompleted)
      break

    case Filter.PRIORITY:
      todoList = todoList.sort((todo1, todo2) => diffPriority(todo1, todo2))
  }

  return `
    <li class="todoapp-container" data-user=${_id}>
      ${UserTitle(name)}
      <div class="todoapp">
        ${TodoInput()}
        <section class="main" id="todo-list">
          <ul class="todo-list">
            ${todoList.map((todoItem) => TodoItem(todoItem)).join('')}
          </ul>
        </section>
        ${Counter(todoList.length, filter)}
      </div>
    </li>
  `
}

const Counter = (count, filter) => {
  const { SHOW_ALL, SHOW_PRIORITY, SHOW_ACTIVE, SHOW_COMPLETED } = actions
  return `
    <div class="count-container">
      <span class="todo-count">총 <strong>${count}</strong> 개</span>
      <ul class="filters">
        <li>
          <a href="#all" class='${
            filter === Filter.ALL ? 'selected' : ''
          }' data-action=${SHOW_ALL}>전체보기</a>
        </li>
        <li>
          <a href="#priority" class='${
            filter === Filter.PRIORITY ? 'selected' : ''
          }' data-action=${SHOW_PRIORITY}>우선 순위</a>
        </li>
        <li>
          <a href="#active" class='${
            filter === Filter.ACTIVE ? 'selected' : ''
          }' data-action=${SHOW_ACTIVE}>해야할 일</a>
        </li>
        <li>
          <a href="#completed" class='${
            filter === Filter.COMPLETE ? 'selected' : ''
          }' data-action=${SHOW_COMPLETED}>완료한 일</a>
        </li>
      </ul>
      <button class="clear-completed"  data-action=${DELETE_TODOS}>모두 삭제</button>
    </div>
  `
}

const getLabelColor = (priority) => {
  if (priority === Priority.FIRST) {
    return 'primary'
  }

  if (priority === Priority.SECOND) {
    return 'secondary'
  }

  return
}

const getLabelContents = (priority) => {
  if (priority === Priority.FIRST) {
    return '1'
  }

  if (priority === Priority.SECOND) {
    return '2'
  }

  return
}

export default class TodoContainer extends Component {
  template() {
    const { members } = store.getState()

    return `
        ${members && members.map((member) => TodoList(member)).join('')}
        <li class="add-user-button-container">
          <button id="add-user-button" class="ripple" data-action=${ADD_MEMBER}>
            <span class="material-icons" data-action=${ADD_MEMBER}>add</span>
          </button>
        </li>
      `
  }

  setEvent(target) {
    this.addClickEvent(target)
    this.addEnterEvent(target)
    this.addEditTodoEvent(target)
    this.setPriorityTodoItem(target)
  }

  setPriorityTodoItem(target) {
    target.addEventListener(Event.CHANGE, (event) => {
      const changeElement = event.target
      const priority = changeElement.value

      if (priority !== Priority.SECOND && priority !== Priority.FIRST) {
        event.stopImmediatePropagation()
        return
      }

      const teamId = this.getTeamId()
      const memberId = this.getMemberId(changeElement)
      const itemId = this.getItemId(changeElement)

      store.dispatch(priorityTodo(memberId, itemId, priority))

      TodoConnector.priorityItem(teamId, memberId, itemId, priority)

      event.stopImmediatePropagation()
    })
  }

  addEditTodoEvent(target) {
    target.addEventListener(Event.DOUBLE_CLICK, (event) => {
      const editLabel = event.target

      if (editLabel.dataset.action !== actions.EDIT_TODO) {
        event.stopImmediatePropagation()
        return
      }

      const itemId = this.getItemId(editLabel)
      const memberId = this.getMemberId(editLabel)

      store.dispatch(editTodo(memberId, itemId))

      event.stopImmediatePropagation()
    })

    target.addEventListener(Event.DOUBLE_CLICK, (event) => {
      const editInput = document.activeElement

      if (event.key !== Keyboard.ENTER) {
        event.stopImmediatePropagation()
        return
      }

      if (editInput.dataset.action !== EDIT_COMPLETE) {
        event.stopImmediatePropagation()
        return
      }

      const contents = editInput.value
      if (!validationTodoContents(contents)) {
        event.stopImmediatePropagation()
        return
      }
    })
  }

  addEnterEvent(target) {
    target.addEventListener(Event.KEY_DOWN, (event) => {
      const activeElement = document.activeElement

      if (event.key !== Keyboard.ENTER && event.key !== Keyboard.ESCASE) {
        event.stopImmediatePropagation()
        return
      }

      const action = activeElement.dataset.action

      if (action !== CREATE_TODO && action !== EDIT_COMPLETE) {
        event.stopImmediatePropagation()
        return
      }

      if (event.key === Keyboard.ESCASE) {
        const memberId = this.getMemberId(activeElement)
        const itemId = this.getItemId(activeElement)

        store.dispatch(cancelEditing(memberId, itemId))
        event.stopImmediatePropagation()
        return
      }

      if (!validationTodoContents(activeElement.value)) {
        event.stopImmediatePropagation()
        alert('두 글자 이상 입력해주세요.')
        return
      }

      const teamId = this.getTeamId()
      const memberId = this.getMemberId(activeElement)
      switch (action) {
        case CREATE_TODO:
          store.dispatch(loadingStart())

          const createTodo$ = Observable.fromPromise(
            TodoConnector.createTodoItem(teamId, memberId, activeElement.value)
          )

          createTodo$.subscribe({
            next(todo) {
              store.dispatch(createTodo(memberId, todo))
            },
            error(e) {
              console.error(e)
            },
            complete() {
              store.dispatch(loadingEnd())
            },
          })
          break
        case EDIT_COMPLETE:
          const contents = activeElement.value
          const itemId = this.getItemId(activeElement)

          store.dispatch(editComplete(memberId, itemId, contents))

          TodoConnector.editItem(teamId, memberId, itemId, contents).catch(
            (error) => console.error(error)
          )
          break
      }

      event.stopImmediatePropagation()
    })
  }

  addClickEvent(target) {
    target.addEventListener(Event.CLICK, (event) => {
      const targetElem = event.target
      const action = targetElem.dataset.action

      if (!clickEvents.includes(action)) {
        event.stopImmediatePropagation()
        return
      }

      const teamId = this.getTeamId()
      const memberId = this.getMemberId(targetElem)
      const itemId = this.getItemId(targetElem)

      const { SHOW_ALL, SHOW_PRIORITY, SHOW_ACTIVE, SHOW_COMPLETED } = actions
      switch (action) {
        case TOGGLE_TODO:
          const toggleTodo$ = Observable.fromPromise(
            TodoConnector.toggleTodoItem(teamId, memberId, itemId)
          )
          store.dispatch(loadingStart())
          toggleTodo$.subscribe({
            next() {
              store.dispatch(toggleTodo(memberId, itemId))
            },
            error(e) {
              console.error(e)
            },
            complete() {
              store.dispatch(loadingEnd())
            },
          })
          TodoConnector.toggleTodoItem(teamId, memberId, itemId).catch(
            (error) => console.error(error)
          )
          break

        case DELETE_TODO:
          store.dispatch(deleteTodo(memberId, itemId))

          TodoConnector.deleteTodoItem(teamId, memberId, itemId).catch(
            (error) => console.error(error)
          )
          break

        case ADD_MEMBER:
          const name = prompt('새로운 팀원 이름을 입력해주세요')

          if (!validationUserName(name)) {
            event.stopImmediatePropagation()
            return
          }

          const addMember$ = Observable.fromPromise(
            TodoConnector.addMember(teamId, name)
          ).map((res) => res.members)

          store.dispatch(loadingStart())
          addMember$.subscribe({
            next(members) {
              store.dispatch(addMember(members))
            },
            error(e) {
              console.error(e)
            },
            complete() {
              store.dispatch(loadingEnd())
            },
          })
          break

        case DELETE_TODOS:
          store.dispatch(deleteTodos(memberId))

          TodoConnector.deleteTodoItems(teamId, memberId).catch((error) =>
            console.error(error)
          )
        case SHOW_ALL:
          store.dispatch(changeFilter(memberId, Filter.ALL))
          break
        case SHOW_PRIORITY:
          store.dispatch(changeFilter(memberId, Filter.PRIORITY))
          break
        case SHOW_ACTIVE:
          store.dispatch(changeFilter(memberId, Filter.ACTIVE))
          break
        case SHOW_COMPLETED:
          store.dispatch(changeFilter(memberId, Filter.COMPLETE))
          break
      }

      event.stopImmediatePropagation()
    })
  }

  getTeamId() {
    const { _id } = store.getState()
    return _id
  }

  getMemberId(element) {
    const userElement = element.closest('[data-user]')

    if (!userElement) {
      return null
    }

    return userElement.dataset.user
  }

  getItemId(element) {
    const todoElement = element.closest('[data-todo]')

    if (!todoElement) {
      return null
    }

    return todoElement.dataset.todo
  }
}

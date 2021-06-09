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
  createTodo,
  deleteTodo,
  editComplete,
  editTodo,
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
              <option value="0" selected>순위</option>
              <option value="1">1순위</option>
              <option value="2">2순위</option>
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

const TodoList = ({ _id, name, todoList = [], filter }) => {
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

const Counter = (count, filter = Filter.ALL) => {
  const { SHOW_ALL, SHOW_PRIORITY, SHOW_ACTIVE, SHOW_COMPLETED } = actions
  return `
    <div class="count-container">
      <span class="todo-count">총 <strong>${count}</strong> 개</span>
      <ul class="filters">
        <li>
          <a href="#all" class=${
            filter === Filter.ALL ? 'selected' : ''
          } data-action=${SHOW_ALL}>전체보기</a>
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

      console.log(contents)
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

      const contents = activeElement.value

      if (!validationTodoContents(contents)) {
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
            TodoConnector.createTodoItem(teamId, memberId, contents)
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
      switch (action) {
        case TOGGLE_TODO:
          store.dispatch(toggleTodo(memberId, itemId))
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

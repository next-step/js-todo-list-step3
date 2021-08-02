import { deleteTodoAPI, updateTodoAPI, updateTodoPriorityAPI, updateTodoToggleAPI } from '../../api/requests.js'
import Component from '../../core/Component.js'
import { $ } from '../../utils/selectors.js'
import { PRIORITY } from './constants.js'
import { filterTodoList } from '../../utils/helpers.js'
import { selectTemplate } from './templates.js'

export default class TodoItem extends Component {
  constructor(app, props) {
    super(app, props)
  }
  template = () => {
    const { member, filter } = this.props.getState()
    const todoList = filterTodoList(filter, member)
    return `${todoList
      .map((todo) => {
        return `<li class="todo-list-item ${todo.isCompleted && 'completed'}">
        <div class="view" data-todo-id=${todo._id} data-todo-contents=${todo.contents}>
          <input class="toggle" type="checkbox" data-event="toggle" ${todo.isCompleted && 'checked'}/>
          <label class="label">
            <div class="chip-container">
            ${selectTemplate(todo.priority)}
            </div>
            ${todo.contents}
          </label>
          <button data-event="destroy" class="destroy"></button>
        </div>
        <input class="edit" value="${todo.contents}" />
      </li>`
      })
      .join('')}`
  }
  mount() {
    $(this.app).addEventListener('click', async ({ target }) => {
      if (target.dataset.event === 'destroy') {
        const { teamId, member } = this.props.getState()
        const itemId = target.closest('[data-todo-id]').dataset.todoId
        const deletedTodo = await deleteTodoAPI(teamId, member._id, itemId)
        if (deletedTodo) {
          this.props.setState({ type: 'DELETETODO', data: itemId })
        }
      }
    })
    $(this.app).addEventListener('click', async ({ target }) => {
      if (target.dataset.event === 'toggle') {
        const { teamId, member } = this.props.getState()
        const itemId = target.closest('[data-todo-id]').dataset.todoId
        const updatedTodo = await updateTodoToggleAPI(teamId, member._id, itemId)
        if (updatedTodo) {
          this.props.setState({ type: 'UPDATETODO', data: updatedTodo })
        }
      }
    })
    $(this.app).addEventListener('change', async ({ target }) => {
      if (target.dataset.event === 'select') {
        const { teamId, member } = this.props.getState()
        const itemId = target.closest('[data-todo-id]').dataset.todoId
        const updatedTodo = await updateTodoPriorityAPI(teamId, member._id, itemId, {
          priority: PRIORITY[target.value],
        })
        if (updatedTodo) {
          this.props.setState({ type: 'UPDATETODO', data: updatedTodo })
        }
      }
    })
    $(this.app).addEventListener('dblclick', async ({ target }) => {
      if (target.className === 'label') {
        target.closest('li').className = 'editing'
      }
    })
    document.body.addEventListener('keydown', async ({ target, key }) => {
      if (key === 'Escape') {
        const { todoId, todoContents } = target.closest('[data-todo-id]').dataset
        const input = $('.edit').value
        const { teamId, member } = this.props.getState()
        if (todoContents !== input) {
          const updatedTodo = await updateTodoAPI(teamId, member._id, todoId, {
            contents: input,
          })
          this.props.setState({ type: 'UPDATETODO', data: updatedTodo })
        }
      }
    })
  }
}

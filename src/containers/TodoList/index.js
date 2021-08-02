import Store from '../../store/index.js'
import Component from '../../core/Component.js'
import TodoInput from '../../components/TodoInput/index.js'
import TodoItem from '../../components/TodoItem/index.js'
import { buildNewState } from './helpers.js'
import TodoTotal from '../../components/TodoTotal/index.js'
export default class TodoList extends Component {
  constructor(app, props) {
    super(app, props)
    this.store = new Store()
    this.state = {
      member: props.member,
      teamId: props.teamId,
      filter: 'all',
    }
    this.init()
  }

  init = () => {
    this.TodoItem = new TodoItem(`#todo-item-${this.state.member._id}`, {
      getState: this.getState,
      setState: this.setState,
    })
    this.TodoInput = new TodoInput(`#todoapp-${this.state.member._id}`, {
      getState: this.getState,
      setState: this.setState,
    })
    this.TodoTotal = new TodoTotal(`#count-${this.state.member._id}`, {
      getState: this.getState,
      setState: this.setState,
    })
    this.store.registerObserver(this.TodoItem, this.TodoInput, this.TodoTotal)
  }
  getState = () => {
    return this.state
  }
  setState = (message) => {
    this.state = buildNewState(this.state, message)
    this.store.notifyObservers('RENDER')
  }
  mount = () => {
    this.store.notifyObservers('MOUNT')
  }
  template = () => {
    //prettier-ignore
    const { member: { name, _id }} = this.state
    return `<li class="todoapp-container">
    <h2>
      <span><strong>${name}</strong>'s Todo List</span>
    </h2>
    <div class="todoapp">
      <section id="todoapp-${_id}" class="input-container">
      ${this.TodoInput.template()}
      </section>
      <section class="main">
        <ul id="todo-item-${_id}" class="todo-list">
            ${this.TodoItem.template()}
        </ul>
      </section>
      <div id="count-${_id}" class="count-container">
        ${this.TodoTotal.template()}
      </div>
    </div>
  </li>
`
  }
}

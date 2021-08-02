import Component from '../../core/Component.js'
import { deleteAllTodos } from '../../api/requests.js'
import { filterTodoList } from '../../utils/helpers.js'
import { $ } from '../../utils/selectors.js'
export default class TodoTotal extends Component {
  constructor(app, props) {
    super(app, props)
    this.props = props
  }
  mount = () => {
    $(this.app).addEventListener('click', ({ target }) => {
      if (target.dataset.event === 'filter')
        this.props.setState({
          type: 'UPDATEFILTER',
          data: target.classList[0],
        })
    })
    $(this.app).addEventListener('click', (e) => {
      const { teamId, member } = this.props.getState()
      if (e.target.id === `clear-${member._id}`) {
        deleteAllTodos(teamId, member._id)
        this.props.setState({
          type: 'DELETETODOS',
        })
      }
    })
  }
  template = () => {
    const { member, filter } = this.props.getState()
    const todoList = filterTodoList(filter, member)
    return `<span class="todo-count">총 <strong>${todoList.length}</strong> 개</span>
        <ul id="filters-${member._id}" class="filters">
            <li><a href="#" class="all ${filter === 'all' && 'selected'}" data-event="filter">전체보기</a>
            </li>
        <li>
        <a href="#priority" class="priority ${filter === 'priority' && 'selected'}" data-event="filter">우선 순위</a>
        </li>
      <li>
        <a href="#active" class="active ${filter === 'active' && 'selected'}" data-event="filter">해야할 일</a>
      </li>
      <li>
        <a href="#completed" class="completed ${filter === 'completed' && 'selected'}" data-event="filter">완료한 일</a>
      </li>
      </ul>
      <button id="clear-${member._id}" class="clear-completed">모두 삭제</button>
     `
  }
}

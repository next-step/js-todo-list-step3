import Component from '../../core/Component.js'
import { $ } from '../../utils/selectors.js'

export default class TodoFilter extends Component {
  constructor(app, props) {
    super(app, props)
  }
  template = () => {
    const { filter } = this.props.getState()
    return `<li><a href="#" class="all ${filter === 'all' && 'selected'}">전체보기</a></li>
    <li>
      <a href="#priority" class="priority ${filter === 'priority' && 'selected'}">우선 순위</a>
    </li>
    <li>
      <a href="#active" class="active ${filter === 'active' && 'selected'}">해야할 일</a>
    </li>
    <li>
      <a href="#completed" class="completed ${filter === 'completed' && 'selected'}">완료한 일</a>
    </li>`
  }
  mount = () => {
    $(this.app).addEventListener('click', (e) => {
      this.props.setState({
        type: 'UPDATEFILTER',
        data: e.target.classList[0],
      })
    })
  }
}

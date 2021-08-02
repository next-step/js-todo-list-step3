import { createTodoAPI } from '../../api/requests.js'
import Component from '../../core/Component.js'
import { $ } from '../../utils/selectors.js'

export default class TodoInput extends Component {
  constructor(app, props) {
    super(app, props)
  }
  template = () => {
    return `<input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />`
  }
  mount = () => {
    $(this.app).addEventListener('keypress', async (e) => {
      if (e.code === 'Enter') {
        const { teamId, member } = this.props.getState()

        const todo = await createTodoAPI(teamId, member._id, {
          contents: e.target.value,
        })
        if (todo) {
          this.props.setState({ type: 'ADDTODO', data: todo })
          e.target.value = ''
        }
      }
    })
  }
}

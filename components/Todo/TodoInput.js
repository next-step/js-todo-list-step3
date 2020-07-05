import { KEY_NAME } from '../../utils/constants.js'
import todoApis from '../../api/todoApis.js'

export default function TodoInput(props) {
  if (new.target !== TodoInput) {
    return new TodoInput(props)
  }
  const { $target, teamId, memberId, getTodos } = props
  this.$target = $target
  this.teamId = teamId
  this.memberId = memberId
  this.getTodos = getTodos

  this.init = () => {
    this.bindEvent()
  }

  this.bindEvent = () => {
    const onAddTodoItemHandler = async (e) => {
      if (e.key === KEY_NAME.ENTER && e.target.value.trim()) {
        try {
          await todoApis.createTodo({
            teamId,
            memberId,
            contents: e.target.value,
          })
          getTodos()
        } catch (e) {
          console.error(e)
        }
        e.target.value = ''
      }
    }

    this.$target.addEventListener('keypress', onAddTodoItemHandler)
  }

  this.setState = (username) => {
    this.username = username
  }

  this.init()
}

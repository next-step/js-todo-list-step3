import { KEY_NAME } from '../../utils/constants.js'
import todoApis from '../../api/member.js'

TodoInput.prototype.bindEvent = function () {
  const onAddTodoItemHandler = async (e) => {
    if (e.key !== KEY_NAME.ENTER || !e.target.value.trim()) {
      return
    }
    try {
      await todoApis.createTodo({
        teamId: this.teamId,
        memberId: this.memberId,
        contents: e.target.value,
      })
      this.getTodos()
    } catch (e) {
      console.error(e)
    }
    e.target.value = ''
  }

  this.$target.addEventListener('keypress', onAddTodoItemHandler)
}

export default function TodoInput(props) {
  if (new.target !== TodoInput) {
    return new TodoInput(props)
  }
  const { $target, teamId, memberId, getTodos } = props
  this.$target = $target
  this.teamId = teamId
  this.memberId = memberId
  this.getTodos = getTodos

  this.bindEvent()
}

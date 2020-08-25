import { isEmpty, isEnter } from '../../utils/validation.js'
import todoApis from '../../api/member.js'

TodoInput.prototype.bindEvent = function () {
  const onAddTodoItemHandler = async (e) => {
    if (!isEnter(e.key) || isEmpty(e.target.value.trim())) {
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

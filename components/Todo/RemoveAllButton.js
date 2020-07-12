import memberApis from '../../api/member.js'

RemoveAllButton.prototype.bindEvent = function () {
  const deleteAllTodosListener = async (e) => {
    try {
      await memberApis.deleteAllTodo(this.teamId, this.memberId)
      this.getTodos()
    } catch (e) {
      console.error(e)
    }
  }
  this.$target.addEventListener('click', deleteAllTodosListener)
}

export default function RemoveAllButton(props) {
  if (new.target !== RemoveAllButton) {
    return new RemoveAllButton(props)
  }
  const { $target, teamId, memberId, getTodos } = props
  this.$target = $target
  this.teamId = teamId
  this.memberId = memberId
  this.getTodos = getTodos

  this.bindEvent()
}

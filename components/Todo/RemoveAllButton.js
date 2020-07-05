import memberApis from '../../api/member.js'

RemoveAllButton.prototype.init = function () {
  this.$button = document.createElement('button')
  this.$button.className = 'clear-completed'
  this.$button.innerHTML = '모두 삭제'
  this.$target.appendChild(this.$button)
  this.bindEvent()
}

RemoveAllButton.prototype.bindEvent = function () {
  const deleteAllTodosListener = async (e) => {
    try {
      await memberApis.deleteAllTodo(this.teamId, this.memberId)
      this.getTodos()
    } catch (e) {
      console.error(e)
    }
  }
  this.$button.addEventListener('click', deleteAllTodosListener)
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

  this.init()
}

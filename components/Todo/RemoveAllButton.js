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
      await memberApis.deleteTodoAll(this.username)
      this.getTodos()
    } catch (e) {
      console.error(e)
    }
  }
  this.$button.addEventListener('click', deleteAllTodosListener)
}

export default function RemoveAllButton({ $target }) {
  if (new.target !== RemoveAllButton) {
    return new RemoveAllButton({ $target })
  }
  this.$target = $target

  this.init()
}

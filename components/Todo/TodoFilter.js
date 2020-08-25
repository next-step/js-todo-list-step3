import { TAG_NAME } from '../../utils/constants.js'

TodoFilter.prototype.bindEvent = function () {
  const onFilterTodoListListener = (e) => {
    if (e.target.tagName !== TAG_NAME.A) {
      return
    }
    e.preventDefault()
    this.onFilter(e.target.className)
  }

  this.$target.addEventListener('click', onFilterTodoListListener)
}

export default function TodoFilter({ $target, onFilter }) {
  if (new.target !== TodoFilter) {
    return new TodoFilter({ $target, onFilter })
  }
  this.$target = $target
  this.onFilter = onFilter

  this.bindEvent()
}

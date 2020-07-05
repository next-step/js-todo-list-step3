import { TAG_NAME } from '../../utils/constants.js'
import { todoFilterTemplate } from '../../utils/templates.js'

export default function TodoFilter({ $target, onFilter }) {
  if (new.target !== TodoFilter) {
    return new TodoFilter({ $target, onFilter })
  }
  this.$target = $target

  this.init = () => {
    this.$target.innerHTML = todoFilterTemplate
    this.bindEvent()
  }

  this.bindEvent = () => {
    this.$target.addEventListener('click', (e) => {
      if (e.target.tagName === TAG_NAME.A) {
        e.preventDefault()
        onFilter(e.target.className)
      }
    })
  }

  this.init()
}

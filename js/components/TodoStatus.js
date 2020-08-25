import { todoStatus } from '../utils/constant.js'
import { todoClassName } from '../utils/constant.js'
import { validateNewInstance, validateElement } from '../utils/validator.js'

export default function TodoStatus({ $target, onSetTodoStatus }) {
  validateNewInstance(new.target, TodoStatus)
  validateElement($target)

  this.$target = $target
  this.status = todoStatus.ALL

  const onClickHandler = (e) => {
    const parentNode = e.target.closest('ul')
    if (parentNode.className !== todoClassName.FILTERS) {
      return
    }

    Object.values(todoStatus).map((status) => {
      if (e.target.classList.contains(status)) {
        this.status = status
      }
    })
    onSetTodoStatus(this.status)
  }
  this.$target.addEventListener('click', onClickHandler)

  this.setState = function (nextData) {
    this.status = nextData

    this.$target
      .querySelector(`.${todoClassName.SELECTED}`)
      .classList.remove(todoClassName.SELECTED)

    switch (this.status) {
      case todoStatus.ALL:
        this.$target
          .querySelector(`.${todoClassName.ALL}`)
          .classList.add(todoClassName.SELECTED)
        break

      case todoStatus.PRIORITY:
        this.$target
          .querySelector(`.${todoClassName.PRIORITY}`)
          .classList.add(todoClassName.SELECTED)

      case todoStatus.ACTIVE:
        this.$target
          .querySelector(`.${todoClassName.ACTIVE}`)
          .classList.add(todoClassName.SELECTED)
        break

      case todoStatus.COMPLETED:
        this.$target
          .querySelector(`.${todoClassName.COMPLETED}`)
          .classList.add(todoClassName.SELECTED)
        break
    }
  }
}

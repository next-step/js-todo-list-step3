import {
  isEnterKey,
  isNotEmptyString,
  validateNewInstance,
  validateElement,
} from '../utils/validator.js'

export default function TodoInput({ $target, onAddTodo }) {
  validateNewInstance(new.target, TodoInput)
  validateElement($target)

  this.$target = $target

  const onKeyPressEventHandler = (e) => {
    if (!isEnterKey(e) || !isNotEmptyString(e.target.value)) {
      return
    }
    onAddTodo(e.target.value)
    e.target.value = ''
  }
  this.$target.addEventListener('keypress', onKeyPressEventHandler)
}

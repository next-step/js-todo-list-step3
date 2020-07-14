import { validateNewInstance, validateElement } from '../utils/validator.js'

export default function TodoDeleteAll({ $target, onDeleteAll }) {
  validateNewInstance(new.target, TodoDeleteAll)
  validateElement($target)

  this.$target = $target

  this.$target.addEventListener('click', onDeleteAll)
}

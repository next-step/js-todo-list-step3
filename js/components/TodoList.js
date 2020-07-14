import { todoClassName } from '../utils/constant.js'
import {
  isEnterKey,
  isEscKey,
  isNotEmptyString,
  validateNewInstance,
  validateElement,
} from '../utils/validator.js'
import { todoItemTemplate } from '../utils/template.js'

export default function TodoList({
  data,
  $target,
  onToggleTodo,
  onDeleteTodo,
  onChangeTodo,
  onChangeTodoPriority,
}) {
  validateNewInstance(new.target, TodoList)
  validateElement($target)

  const onClickHandler = (e) => {
    const id = e.target.closest('li').dataset.id

    if (e.target.classList.contains(todoClassName.TOGGLE)) {
      onToggleTodo(Number(id))
      return
    }

    if (e.target.classList.contains(todoClassName.DESTROY)) {
      onDeleteTodo(Number(id))
    }
  }

  const onKeydownHandler = (e) => {
    if (!e.target.classList.contains(todoClassName.EDIT)) {
      return
    }
    const li = e.target.closest('li')

    if (isEnterKey(e) && isNotEmptyString(e.target.value)) {
      const text = e.target.value
      const id = li.dataset.id

      li.classList.remove(todoClassName.EDITING)
      onChangeTodo(text, Number(id))
      return
    }
    if (isEscKey(e)) {
      e.target.value = this.todoInitialInputValue
      li.classList.remove(todoClassName.EDITING)
    }
  }

  const onDbClickHandler = (e) => {
    if (!e.target.classList.contains(todoClassName.LABEL)) {
      return
    }

    const li = e.target.closest('li')
    li.classList.add(todoClassName.EDITING)

    const input = li.querySelector(`.${todoClassName.EDIT}`)
    input.focus()
    input.setSelectionRange(input.value.length, input.value.length)
    this.todoInitialInputValue = input.value
  }

  const onFocusoutHandler = (e) => {
    if (!e.target.classList.contains(todoClassName.EDIT)) {
      return
    }

    e.target.value = this.todoInitialInputValue

    const li = e.target.closest('li')
    if (li.classList.contains(todoClassName.EDITING)) {
      li.classList.remove(todoClassName.EDITING)
    }
  }

  const onChangeEventHandler = (e) => {
    if (!e.target.classList.contains(todoClassName.CHIP)) {
      return
    }
    const li = e.target.closest('li')
    const id = li.dataset.id
    onChangeTodoPriority(Number(id), Number(e.target.value))
  }

  this.setState = function (nextData) {
    this.todos = nextData
    this.render()
  }

  this.render = function () {
    this.$target.innerHTML = this.todos.map(todoItemTemplate).join('')
  }

  this.bindEvents = function () {
    this.$target.addEventListener('click', onClickHandler)
    this.$target.addEventListener('dblclick', onDbClickHandler)
    this.$target.addEventListener('keydown', onKeydownHandler)
    this.$target.addEventListener('focusout', onFocusoutHandler)
    this.$target.addEventListener('change', onChangeEventHandler)
  }

  this.init = function () {
    this.todos = data
    this.$target = $target
    this.bindEvents()
  }

  this.init()
  this.render()
}

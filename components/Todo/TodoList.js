import { CLASS_NAME } from '../../utils/constants.js'
import { isEsc, isEnter, isEmpty } from '../../utils/validation.js'
import { todoItemHTMLTemplate } from '../../utils/templates.js'
import memberApis from '../../api/member.js'

TodoList.prototype.init = function () {
  this.render()
  this.bindEvents()
}

TodoList.prototype.render = function () {
  this.$target.innerHTML = this.todoList.map(todoItemHTMLTemplate).join('')
}

TodoList.prototype.setState = function (todoList) {
  this.todoList = todoList
  this.render()
}

TodoList.prototype.bindEvents = function () {
  const onClickTodoItemHandler = async ({ target }) => {
    // classlist contains로 비교하기
    const { id } = target.closest(`.${CLASS_NAME.TODO_LIST_ITEM}`).dataset
    if (target.classList.contains(CLASS_NAME.TOGGLE)) {
      try {
        await memberApis.toggleTodo({
          teamId: this.teamId,
          memberId: this.memberId,
          itemId: id,
        })
        this.getTodos()
      } catch (e) {
        console.error(e)
      }
    } else if (target.classList.contains(CLASS_NAME.DESTROY)) {
      try {
        await memberApis.deleteTodo({
          teamId: this.teamId,
          memberId: this.memberId,
          itemId: id,
        })
        this.getTodos()
      } catch (e) {
        console.error(e)
      }
    }
  }

  const onDblclickTodoItemHandler = (e) => {
    const $todoItem = e.target.closest(`.${CLASS_NAME.TODO_LIST_ITEM}`)
    this.editInputValue = $todoItem.querySelector(
      `.${CLASS_NAME.TODO_CONTENTS}`
    ).textContent
    if ($todoItem.classList.contains(CLASS_NAME.EDITING)) {
      return
    }
    $todoItem.classList.add(CLASS_NAME.EDITING)
    const $editInput = $todoItem.querySelector(`.${CLASS_NAME.EDIT}`)
    $editInput.focus()
    $editInput.selectionStart = this.editInputValue.length
  }

  const onEditTodoItemHandler = async (e) => {
    if (!isEsc(e.key) && !isEnter(e.key)) {
      return
    }

    const $todoItem = e.target.closest(`.${CLASS_NAME.TODO_LIST_ITEM}`)
    $todoItem.classList.remove(CLASS_NAME.EDITING) // ESC

    if (!isEnter(e.key) || isEmpty(e.target.value.trim())) {
      return
    }

    const { id } = $todoItem.dataset
    try {
      await memberApis.updateTodoContent({
        teamId: this.teamId,
        memberId: this.memberId,
        itemId: id,
        contents: e.target.value.trim(),
      })
      this.getTodos()
    } catch (e) {
      console.error(e)
    }
  }

  const onFocusOutTodoItemHandler = (e) => {
    if (!e.target.classList.contains(CLASS_NAME.EDIT)) {
      return
    }
    e.target.value = this.editInputValue //초기상태의 value로 reset
    const $todoItem = e.target.closest(`.${CLASS_NAME.TODO_LIST_ITEM}`)
    if ($todoItem.classList.contains(CLASS_NAME.EDITING)) {
      $todoItem.classList.remove(CLASS_NAME.EDITING)
    }
  }

  const onChangePriorityHandler = async (e) => {
    if (
      !e.target.classList.contains(CLASS_NAME.TODO_PRIORITY) ||
      e.target.value === 0
    ) {
      return
    }
    const $todoItem = e.target.closest(`.${CLASS_NAME.TODO_LIST_ITEM}`)
    const { id } = $todoItem.dataset
    try {
      await memberApis.updateTodoPriority({
        teamId: this.teamId,
        memberId: this.memberId,
        itemId: id,
        priority: e.target.value,
      })
      this.getTodos()
    } catch (e) {
      console.error(e)
    }
  }

  const onDragStartHandler = (e) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', this.memberId)
  }

  const onDragOver = (e) => {
    if (e.preventDefault) {
      e.preventDefault()
    }
    e.dataTransfer.dropEffect = 'move'
  }

  const onDrop = async (e) => {
    if (!e.target.classList.contains(CLASS_NAME.TODO_LABEL)) {
      return
    }
    const { index: newPosition, id: itemId } = e.target.dataset
    const originMemberId = e.dataTransfer.getData('text/plain')
    const { memberId: targetMemberId, teamId } = e.target.closest(
      `.${CLASS_NAME.TODO_APP_CONTAINER}`
    ).dataset
    const response = await memberApis.changeTodoItemIndex({
      teamId,
      itemId,
      body: {
        originMemberId,
        targetMemberId,
        newPosition: Number(newPosition) + 1,
      },
    })
    this.getTodos()
  }

  this.$target.addEventListener('click', onClickTodoItemHandler)
  this.$target.addEventListener('dblclick', onDblclickTodoItemHandler)
  this.$target.addEventListener('keyup', onEditTodoItemHandler)
  this.$target.addEventListener('focusout', onFocusOutTodoItemHandler)
  this.$target.addEventListener('change', onChangePriorityHandler) // chip select

  this.$target.addEventListener('dragstart', onDragStartHandler)
  this.$target.addEventListener('dragover', onDragOver)
  this.$target.addEventListener('drop', onDrop)
}

export default function TodoList(props) {
  if (new.target !== TodoList) {
    return new TodoList(props)
  }
  const { $target, todoList, teamId, memberId, getTodos } = props
  this.$target = $target
  this.todoList = todoList
  this.teamId = teamId
  this.memberId = memberId
  this.getTodos = getTodos
  this.init()
}

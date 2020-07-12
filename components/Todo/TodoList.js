import { TAG_NAME, CLASS_NAME, KEY_NAME } from '../../utils/constants.js'
import memberApis from '../../api/member.js'
import { todoItemHTMLTemplate } from '../../utils/templates.js'

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
    const li = target.closest('li')
    const { id } = li.dataset
    if (
      target.tagName === TAG_NAME.INPUT &&
      target.className === CLASS_NAME.TOGGLE
    ) {
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
    } else if (target.tagName === TAG_NAME.BUTTON) {
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
    const li = e.target.closest('li')
    this.editInputValue = e.target.childNodes[2].textContent.trim() // 수정 시작할 때 초기 상태의 value 저장
    if (!li.classList.contains(CLASS_NAME.EDITING)) {
      li.classList.add(CLASS_NAME.EDITING)
      const $editInput = li.querySelector(`.${CLASS_NAME.EDIT}`)
      $editInput.focus()
      $editInput.selectionStart = this.editInputValue.length
    }
  }
  const onEditTodoItemHandler = async (e) => {
    if (e.key !== KEY_NAME.ESC && e.key !== KEY_NAME.ENTER) {
      return
    }
    const li = e.target.closest('li')
    li.classList.remove(CLASS_NAME.EDITING)
    if (e.key === KEY_NAME.ENTER && e.target.value.trim()) {
      li.classList.remove(CLASS_NAME.EDITING)
      const { id } = li.dataset
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
  }

  const onFocusOutTodoItemHandler = (e) => {
    if (
      e.target.tagName === TAG_NAME.INPUT &&
      e.target.className === CLASS_NAME.EDIT
    ) {
      e.target.value = this.editInputValue //초기상태의 value로 reset
      const li = e.target.closest('li')
      if (li.classList.contains(CLASS_NAME.EDITING)) {
        li.classList.remove(CLASS_NAME.EDITING)
      }
    }
  }

  const onChangePriorityHandler = async (e) => {
    if (e.target.tagName !== TAG_NAME.SELECT) {
      return
    }
    const li = e.target.closest('li')
    const { id } = li.dataset
    if (e.target.value === 0) {
      return
    }
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
    if (e.target.tagName !== TAG_NAME.LABEL) {
      return
    }
    const { index: newPosition, id: itemId } = e.target.dataset
    const originMemberId = e.dataTransfer.getData('text/plain')
    const { memberId: targetMemberId, teamId } = e.target.closest(
      '.todoapp-container'
    ).dataset
    alert(Number(newPosition))
    const response = await memberApis.changeTodoItemIndex({
      teamId,
      itemId,
      body: {
        originMemberId,
        targetMemberId,
        newPosition: Number(newPosition) + 1,
      },
    })
    console.log(await response.json())
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
  console.log('todoList', todoList)
  this.$target = $target
  this.todoList = todoList
  this.teamId = teamId
  this.memberId = memberId
  this.getTodos = getTodos
  this.init()
}

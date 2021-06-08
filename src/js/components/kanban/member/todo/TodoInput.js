const renderTemplate = () => {
  return `
    <section class="input-container">
      <input type="text" class="new-todo" placeholder="할 일을 입력해주세요."  autofocus />
    </section>
  `
}

const TodoInput = (handleTodoActions) => {
  const render = () => {
    return renderTemplate()
  }

  const listContainerElement = document.getElementById('todoapp-list-container')

  const addTodoItem = (e) => {
    const { target, key } = e
    if (!target?.classList?.contains('new-todo') || key !== 'Enter') {
      return null
    }

    if (target.value.trim().length < 2) {
      return alert('2글자 이상이어야 합니다.')
    }

    handleTodoActions.addTodo(target)
    target.value = ''
  }

  listContainerElement.addEventListener('keypress', addTodoItem)

  return { render }
}

export default TodoInput

const renderTemplate = () => {
  return `
    <section class="input-container">
      <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
    </section>
  `
}

const TodoInput = ({ onAddTodo }) => {
  const render = () => {
    return renderTemplate()
  }

  const listContainerElement = document.getElementById('todoapp-list-container')

  const addTodoItem = (e) => {
    const Target = e.target
    if (!Target.classList.contains('new-todo') || e.key !== 'Enter') {
      return
    }

    if (Target.value.trim().length < 2) {
      return alert('2글자 이상이어야 합니다.')
    }

    onAddTodo(Target)
    Target.value = ''
  }

  listContainerElement.addEventListener('keydown', addTodoItem)

  return { render }
}

export default TodoInput

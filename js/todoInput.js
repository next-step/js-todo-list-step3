const INPUT_CLASS = 'new-todo';

function createContainer() {
  const $inputContainer = document.createElement('section');
  $inputContainer.classList.add('input-container');

  const $input = document.createElement('input');
  $input.classList.add(INPUT_CLASS);
  $input.placeholder = '할 일을 입력해주세요';

  $inputContainer.appendChild($input);

  return $inputContainer;
}

const todoInput = ($container, store) => {
  const $todoApp = $container.querySelector('.todoapp');
  const $inputContainer = createContainer();
  const $input = $inputContainer.querySelector('.new-todo');

  $input.addEventListener('keyup', createTodoItem);

  function createTodoItem({ target, key }) {
    if (!target.classList.contains(INPUT_CLASS)) {
      return;
    }
    if (key !== 'Enter') {
      return;
    }

    store.createItem(target.value);
    target.value = '';
  }

  return {
    init() {
      $todoApp.appendChild($inputContainer);
    },
  };
};

export { todoInput };

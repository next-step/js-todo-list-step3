const INPUT_CLASS = 'new-todo';

const todoInput = ($container) => {
  const $todoApp = $container.querySelector('.todoapp');
  const $inputContainer = createContainer();
  const $input = $inputContainer.querySelector('.new-todo');

  function createContainer() {
    const $inputContainer = document.createElement('section');
    $inputContainer.classList.add('input-container');

    const $input = document.createElement('input');
    $input.classList.add('new-todo');
    $input.placeholder = '할 일을 입력해주세요';

    $inputContainer.appendChild($input);

    return $inputContainer;
  }

  const _createTodoItem = ({ target, key }) => {
    if (!target.classList.contains(INPUT_CLASS)) {
      return;
    }
    if (key !== 'Enter') {
      return;
    }

    $container.dispatchEvent(
      new CustomEvent('create', { detail: target.value })
    );

    target.value = '';
  };

  $input.addEventListener('keyup', _createTodoItem);

  return {
    init() {
      $todoApp.appendChild($inputContainer);
    },
    focus() {
      $input.focus();
    },
  };
};

export { todoInput };

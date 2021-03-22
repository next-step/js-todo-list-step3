const CLASS_COMPLETED = 'completed';
const CLASS_EDITING = 'editing';
const ATTRIBUTE_CHECKED = 'checked';

const extractState = ($li) => {
  return {
    _id: $li.dataset.id,
    contents: $li.querySelector('.label .content').textContent,
    isCompleted: $li.querySelector('.toggle').hasAttribute('checked'),
  };
};

function createContainer() {
  const $listContainer = document.createElement('section');
  $listContainer.classList.add('main');

  const $ul = document.createElement('ul');
  $ul.classList.add('todo-list');
  $listContainer.appendChild($ul);

  return $listContainer;
}

function createListItemTemplate() {
  const $liTemplate = document.createElement('li');

  const $innerDiv = document.createElement('div');
  $innerDiv.classList.add('view');

  const $innerInput = document.createElement('input');
  $innerInput.type = 'checkbox';
  $innerInput.classList.add('toggle');

  const $innerLabel = document.createElement('label');
  $innerLabel.classList.add('label');

  const $innerButton = document.createElement('button');
  $innerButton.classList.add('destroy');

  $innerDiv.appendChild($innerInput);
  $innerDiv.appendChild($innerLabel);
  $innerDiv.appendChild($innerButton);

  const $listInput = document.createElement('input');
  $listInput.classList.add('edit');

  $liTemplate.appendChild($innerDiv);
  $liTemplate.appendChild($listInput);

  return $liTemplate;
}

const eventHandler = (store) => {
  function toggleCompleteStatus({ target }) {
    if (!target.classList.contains('toggle')) {
      return;
    }

    const $li = target.closest('li');
    const isCompleted = target.toggleAttribute(ATTRIBUTE_CHECKED);
    if (isCompleted) {
      $li.classList.add(CLASS_COMPLETED);
    } else {
      $li.classList.remove(CLASS_COMPLETED);
    }

    store.toggleItem(extractState($li)._id); //TODO
  }

  function changeToEditMode({ target }) {
    if (!target.classList.contains('label')) {
      return;
    }

    const $li = target.closest('li');
    $li.classList.add(CLASS_EDITING);
    $li.querySelector('.edit').focus();
  }

  function changeToViewModeOnFocusout({ target }) {
    changeToViewMode(target);
  }

  function changeToViewModeOnEnter({ target, key }) {
    if (key !== 'Enter') {
      return;
    }
    changeToViewMode(target);
  }

  function changeToViewMode(target) {
    if (!target.classList.contains('edit')) {
      return;
    }
    const $li = target.closest('li');
    $li.classList.remove(CLASS_EDITING);

    const $labelContent = $li.querySelector('.label .content');
    const updatedContent = target.value.trim();
    $labelContent.textContent = updatedContent;

    store.updateItem(extractState($li)); //TODO
  }

  function escapeToViewMode({ target, key }) {
    if (!target.classList.contains('edit')) {
      return;
    }

    if (key !== 'Escape') {
      return;
    }

    const $li = target.closest('li');
    $li.classList.remove(CLASS_EDITING);

    const $label = $li.querySelector('.label');
    const oldContent = $label.textContent;
    target.value = oldContent;

    return;
  }

  function removeTodoItem({ target }) {
    if (!target.classList.contains('destroy')) {
      return;
    }

    if (!window.confirm('정말로 삭제하시겠습니까?')) {
      return;
    }

    const $li = target.closest('li');
    $li.remove();

    store.deleteItem(extractState($li)._id); //TODO
  }

  function addEventListener($liTemplate) {
    $liTemplate.addEventListener('click', toggleCompleteStatus);
    $liTemplate.addEventListener('dblclick', changeToEditMode);
    $liTemplate.addEventListener('keyup', changeToViewModeOnEnter);
    $liTemplate.addEventListener('focusout', changeToViewModeOnFocusout);
    $liTemplate.addEventListener('keyup', escapeToViewMode);
    $liTemplate.addEventListener('click', removeTodoItem);

    return $liTemplate;
  }

  return {
    addEventListener,
  };
};

const todoList = ($rootComponent, store) => {
  const $todoApp = $rootComponent.querySelector('.todoapp');
  const $container = createContainer();
  $todoApp.appendChild($container);

  const $ulist = $container.querySelector('.todo-list');
  const _eventHandler = eventHandler(store);

  function createListItem(todoItem) {
    const index = todoItem._id;
    const content = todoItem.contents;
    const isCompleted = todoItem.isCompleted;

    const $todoItem = _eventHandler.addEventListener(createListItemTemplate());
    const $todoLabel = $todoItem.querySelector('label.label');

    const $labelSpan = document.createElement('span');
    $labelSpan.classList.add('content');
    $labelSpan.textContent = content;
    $todoLabel.appendChild($labelSpan);

    $todoItem.querySelector('input.edit').value = content;

    if (isCompleted) {
      $todoItem.classList.add(CLASS_COMPLETED);
      $todoItem
        .querySelector('input.toggle')
        .setAttribute(ATTRIBUTE_CHECKED, null);
    }
    $todoItem.dataset.id = index;

    return $todoItem;
  }

  return {
    refresh(todoItems) {
      $ulist.innerHTML = '';
      $ulist.append(...todoItems.map(createListItem));
    },
  };
};

export { todoList };

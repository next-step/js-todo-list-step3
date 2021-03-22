const filters = ['all', 'active', 'completed'];

const todoStatus = ($rootComponent) => {
  const $todoApp = $rootComponent.querySelector('.todoapp');

  const $countContainer = createCountContainer();
  $todoApp.appendChild($countContainer);

  const $filter = $countContainer.querySelector('ul.filters');
  const $spanCount = $countContainer.querySelector('.todo-count > strong');

  function createCountContainer() {
    const $countContainer = document.createElement('div');
    $countContainer.classList.add('count-container');

    const $spanCount = document.createElement('span');
    $spanCount.classList.add('todo-count');
    $spanCount.innerHTML = `총 <strong></strong> 개`;

    const $ulFilter = document.createElement('ul');
    $ulFilter.classList.add('filters');

    const $allFilter = document.createElement('li');
    $allFilter.innerHTML = `<a href="#all" class="selected">전체보기</a>`;
    const $activeFilter = document.createElement('li');
    $activeFilter.innerHTML = `<a href="#active">해야할 일</a>`;
    const $completedFilter = document.createElement('li');
    $completedFilter.innerHTML = `<a href="#completed">완료한 일</a>`;

    $ulFilter.append($allFilter, $activeFilter, $completedFilter);

    const $clearButton = document.createElement('button');
    $clearButton.classList.add('clear-completed');
    $clearButton.textContent = '모두 삭제';

    $countContainer.append($spanCount, $ulFilter, $clearButton);

    return $countContainer;
  }

  const _selectFilter = ({ target }) => {
    const filterType = target.hash.substring(1);
    if (filters.indexOf(filterType) === -1) {
      return;
    }

    $filter.querySelector('a.selected').classList.remove('selected');

    target.classList.add('selected');

    $rootComponent.dispatchEvent(
      new CustomEvent('filter', { detail: filterType })
    );
  };

  $filter.addEventListener('click', _selectFilter);

  const updateCount = (count) => {
    $spanCount.textContent = count;
  };

  return {
    updateCount,
  };
};

export { todoStatus };

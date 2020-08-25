function TodoFilter({ $rootElement, filterTodo }) {
  const $filters = $rootElement.querySelector('.filters');

  this.filterTodo = (event) => {
    const { target } = event;
    Array.from($filters.getElementsByTagName('a')).forEach((el) => el.classList.remove('selected'));
    target.classList.add('selected');
    const [, mode] = target.href.split('#');
    filterTodo(mode || 'all');
  };

  $filters.addEventListener('click', this.filterTodo);
}

export default TodoFilter;

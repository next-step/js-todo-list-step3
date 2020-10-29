import CreateElement from '../../../lib/CreateElement.js';
import STRINGS from '../../../constant/STRINGS.js';

const CLASS = {
  all: '전체보기',
  priority: '우선 순위',
  active: '해야할 일',
  completed: '완료한 일',
};

const TodoFooter = ({ todoClass }) => {
  const dom = CreateElement('div', { className: 'count-container' });
  const render = () => {
    const todoClassHTML = Object.entries(CLASS).map(([key, value]) => `
              <li data-key="${key}"><button class="${todoClass() === key ? 'selected' : ''}">${value}</button></li>
             `).join('');

      dom.innerHTML = `
        <span class="todo-count" data-component="todoCount">총 <strong>0</strong> 개</span>
        <ul class="filters" data-component="todoClass">
          ${ todoClassHTML } 
        </ul>
        <button class="clear-completed" data-component="deleteAllTodoList">${STRINGS.deleteAll}</button>
    `;
  };
  render();

  return dom;
};


export default TodoFooter;
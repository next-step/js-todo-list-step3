import { TodoItem } from '../../vo/TodoItem.js';
import { $, $$ } from '../../util/domSelection.js';
import { Action } from '../../action/Action.js';

const $app = $('ul.todoapp-list-container');
const _getMemberId = (target) => {
  const $todoList = target.closest('li.todoapp-container');
  return $todoList.dataset.memberid;
};

const _getItemId = (target) => {
  const item = target.closest('li.todo-list-item');
  return item.dataset.itemid;
};

const _deleteItemEvent = async ({ target }) => {
  if (!target) return;
  if (target.classList.contains('destroy')) {
    Action.deleteItem($app.dataset.teamid, _getMemberId(target), _getItemId(target));
  }
};

const _updateItemCompleteToggleEvent = async ({ target }) => {
  if (!target) return;
  if (target.classList.contains('toggle')) {
    Action.updateItemCompleteToggle($app.dataset.teamid, _getMemberId(target), _getItemId(target));
  }
};

const _makeEditableEvent = ({ target }) => {
  if (!target) return;
  if (target.nodeName === 'LABEL' && target.classList.contains('label')) {
    const item = target.closest('li.todo-list-item');
    item.classList.add('editing');
  }
};

const _updateItemEvent = async ({ target, key }) => {
  if (!target) return;
  if (target.nodeName === 'INPUT' && target.classList.contains('edit')) {
    const item = target.closest('li.todo-list-item');
    if (key === 'Escape') {
      item.classList.remove('editing');
      const [label] = $$('.label', item);
      const texts = label.childNodes;
      target.value = texts[texts.length - 1].wholeText.trim();
    } else if (key === 'Enter') {
      Action.updateItem($app.dataset.teamid, _getMemberId(target), _getItemId(target), target.value);
      item.classList.remove('editing');
    }
  }
};

const _updateItemPriority = async ({ target }) => {
  if (!target) return;
  if (target.nodeName === 'SELECT' && target.classList.contains('chip')) {
    const selectedIndex = target.options.selectedIndex;
    const priority = target.options[selectedIndex].value;
    Action.updateItemPriority($app.dataset.teamid, _getMemberId(target), _getItemId(target), priority);
  }
};

export class TodoList {
  constructor() {
    $app.addEventListener('click', _deleteItemEvent);
    $app.addEventListener('click', _updateItemCompleteToggleEvent);
    $app.addEventListener('dblclick', _makeEditableEvent);
    $app.addEventListener('keydown', _updateItemEvent);
    $app.addEventListener('change', _updateItemPriority);
  }
  render(todoList, $todoAppContainer) {
    const [list] = $$('ul.todo-list', $todoAppContainer);
    list.innerHTML = '';
    const priorityDom = {
      NONE: `<select class="chip select">
                <option value="0" selected>미지정</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>`,
      FIRST: `<select class="chip select ${TodoItem.PRIORITY_FIRST_CLASSNAME}">
                  <option value="0" >미지정</option>
                  <option value="1" selected>1순위</option>
                  <option value="2">2순위</option>
                </select>`,
      SECOND: `<select class="chip select ${TodoItem.PRIORITY_SECOND_CLASSNAME}">
                  <option value="0">미지정</option>
                  <option value="1">1순위</option>
                  <option value="2" selected >2순위</option>
                </select>`,
    };

    todoList.forEach((item) => {
      const todoItemText = `<li class="todo-list-item ${item.isCompleted ? TodoItem.COMPLETED : TodoItem.ACTIVE}" data-itemid=${item._id}>
        <div class="view">
          <input class="toggle" type="checkbox" ${item.isCompleted ? 'checked' : ''} />
          <label class="label">
            ${item.priority === TodoItem.PRIORITY_NONE ? priorityDom.NONE : item.priority === TodoItem.PRIORITY_FIRST ? priorityDom.FIRST : priorityDom.SECOND}
            ${item.contents}
          </label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${item.contents}" />
      </li>`;
      list.insertAdjacentHTML('beforeEnd', todoItemText);
    });
  }
}

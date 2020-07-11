import { ERROR_TYPE_MESSAGE } from '../utils/constants.js';

export default function DragAndDropApp({
  draggableItemClass,
  dragItemsWrapperList,
  onDragTodoItem,
}) {
  const $targetSelectedFilter = document.querySelectorAll('a.selected');

  let dragSrcEl = null;
  let dragList = null;
  let dropList = null;

  function handleDragStart(e) {
    for (let node of $targetSelectedFilter) {
      if (node.text !== '전체보기') {
        alert(ERROR_TYPE_MESSAGE.SELECT_ALL_FILTER)
        return;
      }
    }

    dragSrcEl = this;
    dragList = e.target.closest(dragItemsWrapperList);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
    this.classList.add('dragElem');
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    this.classList.add('over');
    e.dataTransfer.dropEffect = 'move';
  }

  function handleDragEnter(e) {}

  function handleDragLeave(e) {
    this.classList.remove('over');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    if (dragSrcEl === this) {
      return;
    }
    if (!dragSrcEl || !dragSrcEl.parentNode) return;
    dropList = this.closest(dragItemsWrapperList);
    dragList === dropList
      ? dropList.removeChild(dragSrcEl)
      : dragList.removeChild(dragSrcEl);
    const originMemberId = dragList.dataset.memberId
    const dropHTML = e.dataTransfer.getData('text/html');
    const { memberId } = dropList.dataset;
    const { itemId } = dragSrcEl.dataset;
    const targetItemId = this.dataset.itemId;
    this.insertAdjacentHTML('beforebegin', dropHTML);
    const dropElem = this.previousSibling;
    addDnDHandlers(dropElem);
    this.classList.remove('over');
    onDragTodoItem(itemId, originMemberId, memberId, targetItemId);
  }

  function handleDragEnd(e) {
    this.classList.remove('over');
  }

  function addDnDHandlers(elem) {
    elem.setAttribute('draggable', true);
    elem.addEventListener('dragstart', handleDragStart);
    elem.addEventListener('dragenter', handleDragEnter);
    elem.addEventListener('dragover', handleDragOver);
    elem.addEventListener('dragleave', handleDragLeave);
    elem.addEventListener('drop', handleDrop);
    elem.addEventListener('dragend', handleDragEnd);
  }

  const $todoItems = document.querySelectorAll(draggableItemClass);
  console.log($todoItems);
  $todoItems.forEach(addDnDHandlers);
}

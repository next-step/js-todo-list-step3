export default function DragAndDropApp({
  memberId,
  draggableItemClass,
  dragItemsWrapperList,
  onDragEnd
}) {
  let dragSrcEl = null;
  let dragList = null;
  let dropList = null;

  function handleDragStart(e) {
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

  function handleDragEnter(e) { }

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
    dropList = this.closest(dragItemsWrapperList);

    // 다른 멤버의 리스트에서 발생하는 이벤트는 무시하도록
    if (!dragList || !dropList) {
      return;
    }
    const dragListClassName = dragList.className;
    const dropListClassName = dropList.className;
    const originMemberId = dragListClassName.substring(dragListClassName.indexOf('member-') + 7);
    const targetMemberId = dropListClassName.substring(dropListClassName.indexOf('member-') + 7);
    if (memberId !== originMemberId && memberId !== targetMemberId) {
      return;
    }

    dragList === dropList ? dropList.removeChild(dragSrcEl) : dragList.removeChild(dragSrcEl);
    const dropHTML = e.dataTransfer.getData('text/html');
    this.insertAdjacentHTML('beforebegin', dropHTML);
    const dropElem = this.previousSibling;
    addDnDHandlers(dropElem);
    this.classList.remove('over');
  }

  function handleDragEnd(e) {
    this.classList.remove('over');

    const draggedItemId = e.path[0].querySelector('label').htmlFor;

    if (!dragList || !dropList) {
      return;
    }
    const dragListClassName = dragList.className;
    const dropListClassName = dropList.className;
    const originMemberId = dragListClassName.substring(dragListClassName.indexOf('member-') + 7);
    const targetMemberId = dropListClassName.substring(dropListClassName.indexOf('member-') + 7);
    onDragEnd && onDragEnd(draggedItemId, originMemberId, targetMemberId);
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
  $todoItems.forEach(addDnDHandlers);
}

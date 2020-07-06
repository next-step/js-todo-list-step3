export default function DragAndDropApp({ draggableItemClass, dragItemsWrapperList }) {
  let dragSrcEl = null
  let dragList = null
  let dropList = null

  function handleDragStart(e) {
    dragSrcEl = this
    dragList = e.target.closest(dragItemsWrapperList)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', this.outerHTML)
    // console.log(e.dataTransfer);
    // console.log(this.outerHTML);
    this.classList.add('dragElem')
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault()
    }
    this.classList.add('over')
    e.dataTransfer.dropEffect = 'move'
  }

  function handleDragEnter(e) {}

  function handleDragLeave(e) {
    this.classList.remove('over')
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation()
    }
    if (dragSrcEl === this) {
      return
    }
    dropList = this.closest(dragItemsWrapperList)
    console.log(dragSrcEl);
    console.log(dropList);
    console.log(dragList);
    dragList === dropList ? dropList.removeChild(dragSrcEl) : dragList.removeChild(dragSrcEl)
    const dropHTML = e.dataTransfer.getData('text/html')
    this.insertAdjacentHTML('beforebegin', dropHTML)
    const dropElem = this.previousSibling
    addDnDHandlers(dropElem)
    this.classList.remove('over')
  }

  function handleDragEnd(e) {
    this.classList.remove('over')
  }

  function addDnDHandlers(elem) {
    elem.setAttribute('draggable', true)
    elem.addEventListener('dragstart', handleDragStart)
    elem.addEventListener('dragenter', handleDragEnter)
    elem.addEventListener('dragover', handleDragOver)
    elem.addEventListener('dragleave', handleDragLeave)
    elem.addEventListener('drop', handleDrop)
    elem.addEventListener('dragend', handleDragEnd)
  }

  const $todoItems = document.querySelectorAll(draggableItemClass)
  // console.log($todoItems);
  $todoItems.forEach(addDnDHandlers)
}

// const test = new DragAndDropApp({
//   draggableItemClass: '.todo-list-item',
//   dragItemsWrapperList: '.todo-list'
// })

// console.log(test);

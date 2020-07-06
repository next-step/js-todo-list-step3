import { memberTodoItem } from '../utils/template.js';
import api from '../utils/api.js';
import { isEnterKey, isEscKey } from '../utils/validator.js';
import DragAndDropApp from '../utils/DragAndDrop.js';

export default class TodoList {
  constructor({ $element, list, memberInfo, onToggleItem, onEditItem, onDeleteItem }) {
    this.$element = $element;
    this.todoItems = list;
    this.teamId = memberInfo.teamId;
    this.memberId = memberInfo.memberId;

    this.editingItemId = -1; // 현재 편집 중인 아이템의 id 저장
    this.editingItemCompleted = ''; // 현재 편집 중인 아이템의 완료 상태 임시 저장

    this.render();

    // 마우스 클릭 이벤트
    this.$element.addEventListener('click', async e => {
      // 아이템 삭제
      if (e.target.nodeName === 'BUTTON' && e.target.className === 'destroy') {
        await api.deleteMemberTodoItem(this.teamId, this.memberId, e.target.name);
        onDeleteItem();
        return;
      }

      // 아이템 완료/미완료 선택
      if (e.target.nodeName !== 'INPUT' || e.target.className !== 'toggle') {
        return;
      }

      // 체크 애니메이션을 위해서 html 원소 직접 접근
      const $targetLi = e.target.closest('li');
      const $targetInput = e.target.closest('input');
      if ($targetInput.hasAttribute('checked')) {
        $targetLi.classList.remove('completed');
        $targetInput.removeAttribute('checked');
      } else {
        $targetLi.classList.add('completed');
        $targetInput.setAttribute('checked', '');
      }

      await api.toggleMemberTodoItem(this.teamId, this.memberId, e.target.name);
      onToggleItem();
    });

    const handleFinishEdit = async saveContent => {
      if (saveContent) {
        await api.editMemberTodoItem(this.teamId, this.memberId, this.editingItemId, saveContent);
        this.editingItemId = -1;
        onEditItem();
      }
      this.editingItemCompleted = '';
    };

    // 마우스 더블 클릭 이벤트
    this.$element.addEventListener('dblclick', e => {
      // 아이템 편집
      if (e.target.nodeName === 'LABEL' || e.target.nodeName === 'SPAN') {
        const targetElement = e.target.nodeName === 'SPAN' ? e.target.closest('label') : e.target;
        const editId = targetElement.htmlFor;
        this.editingItemId = editId;

        const $targetLi = targetElement.closest('li');
        this.editingItemCompleted = $targetLi.className;
        $targetLi.className = 'editing'; // 아이템 완료/미완료 상관없이 editing으로 설정

        // 편집 아이템으로 포커스
        const editInputElement = $targetLi.querySelector(`input.edit`);
        editInputElement.value = $targetLi.querySelector('span').innerText;
        editInputElement.focus();
      }
    });

    this.$element.addEventListener('focusin', e => {
      if (e.target.className === 'edit') {
        e.target.selectionStart = e.target.value.length;
      }
    });

    this.$element.addEventListener('focusout', e => {
      if (e.target.className === 'edit') {
        e.target.closest('li').className = this.editingItemCompleted;
        e.target.value = e.target.value;
        handleFinishEdit();
      }
    });

    // 키보드 입력 이벤트
    this.$element.addEventListener('keydown', e => {
      if (this.editingItemId === -1) {
        return;
      }

      if (isEscKey(e)) {
        e.target.closest('li').className = this.editingItemCompleted;
        handleFinishEdit();
        return;
      }

      if (isEnterKey(e)) {
        handleFinishEdit(e.target.value.trim());
        return;
      }
    });
  }

  handleDragEnd(draggedItemId, originMemberId, targetMemberId) {
    if (originMemberId !== this.memberId && targetMemberId !== this.memberId) {
      return;
    }

    const $todoItemUl = document.querySelector(`.todo-list.member-${targetMemberId}`);
    const todoItemList = $todoItemUl.children;
    const newPosition = [...todoItemList].findIndex(
      item => item.querySelector('label').htmlFor === draggedItemId
    );
    if (newPosition < 0) {
      return;
    }

    api.moveOrderMemberTodoItem(
      this.teamId,
      draggedItemId,
      originMemberId,
      targetMemberId,
      newPosition
    );
  }

  render() {
    this.$element.innerHTML = this.todoItems.map(item => memberTodoItem(item)).join('');

    new DragAndDropApp({
      memberId: this.memberId,
      draggableItemClass: '.todo-list-item',
      dragItemsWrapperList: '.todo-list',
      onDragEnd: this.handleDragEnd.bind(this)
    });
  }

  setState(newTodoItems) {
    this.todoItems = newTodoItems || [];
    this.render();
  }
}

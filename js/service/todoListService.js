'use strict';

import todoApi from '../api/todoApi.js';
import teamApi from '../api/teamApi.js';
import { teamStore } from '../store/teamStore.js';
import { memberStore } from '../store/memberStore.js';
import { todoAppView } from '../view/todoAppView.js';

export default class TodoListService {
  constructor() {}

  deleteItem(target) {
    console.log('TodoListService - deleteItem');
    if (!confirm('정말 삭제 하시겠습니까?')) return;
  }

  toggleItem(target) {
    console.log('TodoListService - toggleItem');
  }

  updateItem(target) {
    console.log('TodoListService - updateItem');
  }

  activateEditMode(target) {
    console.log('TodoListService - activateEditMode');
  }

  deactivateEditMode(target) {
    console.log('TodoListService - exitEditMode');
  }

  changePriority(target) {
    console.log('TodoListService - changePriority');
  }
}

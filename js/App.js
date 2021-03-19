'use strict';

import KanbanController from './controller/kanbanController.js';
import TodoInputController from './controller/todoInputController.js';
import TodoListController from './controller/todoListController.js';
import TodoFilterController from './controller/todoFilterController.js';

const kanbanController = new KanbanController();
const todoInputController = new TodoInputController();
const todoListController = new TodoListController();
const todoFilterController = new TodoFilterController();

kanbanController.loadMemberTodoLists();

'use strict';

import KanbanController from './controller/kanbanController.js';
import TodoInputController from './controller/todoInputController.js';

const kanbanController = new KanbanController();
const todoInputController = new TodoInputController();

kanbanController.loadMemberTodo();

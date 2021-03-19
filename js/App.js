'use strict';

import KanbanController from './controller/kanbanController.js';

const kanbanController = new KanbanController();

kanbanController.init();

console.log('app.js');

console.log(kanbanController.test());

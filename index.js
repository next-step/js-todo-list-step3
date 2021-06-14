import App from './app.js';
import dataController from './src/js/services/index.js';
import { $ } from './src/js/utils/querySelector.js';

new App($('.team-view'), dataController);
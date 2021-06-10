import App from './app.js';
import DataController from './services/dataController.js';

const dataController = new DataController();
new App(document.querySelector('#app'), dataController);
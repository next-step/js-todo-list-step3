import { initialRoutes } from './Router/index.js';

export default class App {
  constructor($app) {
    this.$app = $app;
    initialRoutes($app);
  }
}

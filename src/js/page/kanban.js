import Title from '../components/common/Title.js';
import { $ } from '../util/selector.js';

class App {
  constructor() {
    new Title($('#user-title'));
  }
}

new App();

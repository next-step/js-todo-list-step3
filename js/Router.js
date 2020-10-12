import App from './page/_app.js';
import Home from './page/Home.js';
import Kanban from './page/Kanban.js';
import CreateElement from './lib/CreateElement.js';

const $app = document.getElementById('app');
const $fragment = document.createDocumentFragment();
const $root = CreateElement('div');

const page = {
  '/': Home,
  '/kanban': Kanban
};

const Router = {
  async load() {
    const { pathname } = location;
    let children;

    children = page[pathname]();

    $root.innerHTML = App({ children });
    $fragment.appendChild($root);
    $app.appendChild($fragment);
  },

  async push(uri, data) {
    // history.pushState(data, '', `${uri}/${data.idx}`);
    await this.load();
  },
};

window.onpopstate = () => Router.load();

Router.load();

export default Router;

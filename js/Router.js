import App from './page/_app.js';
import Home from './page/Home.js';
import Kanban from './page/Kanban.js';

const $app = document.getElementById('app');
const $fragment = document.createDocumentFragment();

const page = {
  '/': Home,
  '/kanban': Kanban,
};

const load = async() => {
  const { pathname } = location;
  let children;

  children = page[pathname];
  $fragment.append(App({ children }));
  $app.appendChild($fragment);

};

const push = async(uri, data = null) => {
  let url = uri;
  if (data) {
    url += '?';
    const entries = Object.entries(data);
    entries.forEach(([key, value], i) => {
      if (i === (entries.length - 1)) {
        url += `${key}=${value}`;
        return;
      }
      url += `${key}=${value}&`;
    });
  }

  history.pushState(data, '', url);
  await load();
  onpopstate = () => load();
};


load();

export default { push };

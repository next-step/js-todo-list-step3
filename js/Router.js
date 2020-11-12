import App from './page/_app.js';
import Home from './page/Home.js';
import Kanban from './page/Kanban.js';

const $app = document.getElementById('app');

const page = (pathname) => {
  if (pathname.includes('kanban?')) return Kanban;
  return Home;
};

const load = async() => {
  let children;
  const $fragment = document.createDocumentFragment();

  children = page(location.hash);
  $fragment.append(App({ children }));
  $app.innerHTML = '';
  $app.append($fragment);
};

const push = async(uri, query = null) => {
  let url = `#${uri}`;
  if (query) {
    url += '?';
    const entries = Object.entries(query);
    entries.forEach(([key, value], i) => {
      if (i === (entries.length - 1)) {
        url += `${key}=${value}`;
        return;
      }
      url += `${key}=${value}&`;
    });
  }

  history.pushState(query, '', url);
  await load();
  onpopstate = () => load();
};


load();

export default { push };

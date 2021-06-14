import Detail from '../views/Detail.js';
import Team from '../views/Team.js';

const routes = {
  '/': Team,
  '/detail': Detail,
};
const initialRoutes = ($target) => {
  renderHTML($target, routes['/']);
  window.addEventListener('hashchange', () => {
    return renderHTML($target, getHashRoute());
  });
};

const getHashRoute = () => {
  let route = '/';

  Object.keys(routes).forEach((hashRoute) => {
    if (
      window.location.hash.replace('#', '').split('/')[0] ===
      hashRoute.replace('/', '')
    ) {
      route = hashRoute;
    }
  });
  return routes[route];
};

const renderHTML = ($target, factory) => {
  new factory($target);
};

export { initialRoutes };

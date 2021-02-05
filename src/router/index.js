import Main from "../components/main/index.js";
import Kanban from "../components/kanban/index.js";

const ROUTER_INFO = {
  main: {
    path: "/",
    component: Main,
  },
  kanban: {
    path: "/kanban",
    component: Kanban,
  },
};

const $router = (() => {
  let view;

  const setRouterView = (target) => {
    view = target;
    window.addEventListener("popstate", popState);
  };

  const route = (pathname = "/", state) => {
    history.pushState(state, state?.title, pathname);
    renderView(pathname, state);
  };

  const popState = ({ state }) => {
    renderView(location.pathname, state);
  };

  const renderView = (pathname, state) => {
    const target = Object.values(ROUTER_INFO).find(
      ({ path }) => path === pathname
    );

    if (typeof target.component === "function") {
      target.component = new target.component(state);
    }

    view.innerHTML = "";
    view.appendChild(target.component);
  };

  return {
    setRouterView,
    route,
    back: popState,
    forward: popState,
  };
})();

export default $router;

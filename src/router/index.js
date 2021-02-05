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

  const route = (pathname = "/") => {
    history.pushState({}, "", pathname);
    renderView(pathname);
  };

  const popState = () => {
    renderView(location.pathname);
  };

  const renderView = (pathname) => {
    const target = Object.values(ROUTER_INFO).find(
      ({ path }) => path === pathname
    );

    if (typeof target.component === "function") {
      target.component = new target.component();
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

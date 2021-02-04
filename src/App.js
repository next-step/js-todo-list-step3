import { createElement } from "./utils/createElement.js";
import $router from "./router/index.js";

export default function App() {
  const dom = createElement(`<div class="app-router"></div>`);

  const init = () => {
    $router.setRouterView(dom);
    $router.route();
    window.onpopstate = () => {
      $router.route();
    };
  };

  init();

  return dom;
}

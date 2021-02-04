import App from "./App.js";

const init = () => {
  const app = document.querySelector("#app");
  app.appendChild(new App());
};

init();

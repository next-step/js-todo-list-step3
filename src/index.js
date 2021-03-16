import App from "./App.js";
import "./index.css";

const init = () => {
  const app = document.querySelector("#app");
  app.appendChild(new App());
};

init();

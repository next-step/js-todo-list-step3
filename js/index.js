import TeamApp from "./components/Team/TeamApp.js";
import TodoAppList from "./components/Todo/TodoAppList.js";
import { APP_ID } from "./utils/data.js";

try {
  location.pathname.includes("index.html")
    ? new TeamApp({
        elementId: APP_ID,
      })
    : new TodoAppList({
        elementId: APP_ID,
      });
} catch (err) {
  console.log(`Cannot start App component..${err.stack}`);
}

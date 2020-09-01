import TeamApp from "./components/TeamApp.js";
import { APP_ID } from "./utils/data.js";

try {
  new TeamApp({
    elementId: APP_ID,
  });
} catch (err) {
  console.log(`Cannot start App component..${err.stack}`);
}

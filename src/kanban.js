import Store from "@lib/store";
import Team from "@components/Team";
import { TEAM_STORE } from "@constants/model";
import "./css/style.css";

(function () {
  const teamStore = new Store(TEAM_STORE);
  new Team(teamStore);
})();

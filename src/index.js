import Store from "@lib/store";
import TeamList from "@components/TeamList";
import { TEAM_LIST_STORE } from "@constants/model";
import "./css/style.css";

(function () {
  const teamListStore = new Store(TEAM_LIST_STORE);
  new TeamList(teamListStore);
})();

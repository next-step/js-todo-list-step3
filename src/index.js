import Team from "@components/Team";
import Store from "@lib/store";
import { TEAM_STORE } from "@constants/model";

(function () {
  const teamStore = new Store(TEAM_STORE);
  new Team(teamStore);
})();

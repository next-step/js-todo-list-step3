import { getTeams } from "@lib/api";

class Team {
  constructor(store) {
    this.store = store;
    this.init();
  }

  async init() {
    const { data: _teams } = await getTeams();
    console.log(_teams);
  }
}

export default Team;

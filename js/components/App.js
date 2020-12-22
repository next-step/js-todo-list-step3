import Team from "./Team.js";

const App = class extends Set {
  constructor() {
    super();
  }

  static load(json) {
    const app = new App();
    json.forEach((f) => {
      app.addTeam(Team.load(f));
    });
    return app;
  }

  addTeam(team) {
    if (!team instanceof Team) {
      return console.log('invalid User');
    }
    super.add(team);
  }

  getTeams() {
    return [...super.values()];
  }

  add() {}

  delete() {}

  clear() {}

  values() {}
};

export default App;

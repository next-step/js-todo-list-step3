export default class TeamName {
  constructor() {
    this.$teamName = document.querySelector('#user-title strong');
  }

  render(name) {
    this.$teamName.textContent = name;
  }
}

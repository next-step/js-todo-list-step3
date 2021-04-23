/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
/* eslint-disable no-alert */

export default class TeamList {
  constructor() {
    this.init();
  }

  async init() {
    await this.render();
    this.addTeamButton = document.querySelector('#add-team-button');
    // this.addTeamButton.addEventListener(
    //   'click',
    //   await this.handleClickAddTeamButton.bind(this)
    // );
  }

  async render() {
    const response = await fetch(
      'https://js-todo-list-9ca3a.df.r.appspot.com/api/teams'
    );
    const data = await response.json();
    const teamCardContainers = document.querySelector('#team-list-container');
    for (const item of data) {
      const element = `<div class="team-card-container">
        <a id="${item.id}" href="/kanban.html" class="card">
          <div class="card-title">
            ${item.name}
          </div>
        </a>
        </div>`;
      teamCardContainers.insertAdjacentHTML('afterbegin', element);
    }
    const btnHTML = `<div class="add-team-button-container">
    <button id="add-team-button" class="ripple">
    <span class="material-icons">add</span>
    </button>
    </div>`;
    teamCardContainers.insertAdjacentHTML('beforeend', btnHTML);
  }
}

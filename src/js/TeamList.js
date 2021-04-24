/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
/* eslint-disable no-alert */

import { $, $$ } from './constants.js';
import { makeAddTeamButton, makeTeamCardContainer } from './template.js';
import API from './api.js';

export default class TeamList {
  constructor() {
    this.API = new API();
    this.init();
  }

  async addEvents() {
    console.log('addEvents');
    $('#add-team-button').addEventListener(
      'click',
      await this.handleClickAddTeamButton.bind(this)
    );
    $$('.team-card-container').forEach(teamCardContainer => {
      teamCardContainer.addEventListener(
        'click',
        this.handleClickTeamCard.bind(this)
      );
    });
  }

  async handleClickAddTeamButton() {
    console.log('handleClickAddTeamButton');
    const teamName = prompt('팀 이름을 입력해주세요');
    if (teamName === null || teamName.length < 1) {
      alert('팀 이름은 1글자 이상이어야 합니다.');
      return;
    }
    const response = await this.API.addTeam(teamName);
    await this.render();
  }

  handleClickTeamCard(event) {
    console.log('handleClickTeamCard');
    const { id } = event.target.closest('a');

    localStorage.setItem('teamId', id);
  }

  renderTeamCardContainers(teamInfos) {
    console.log('renderTeamCardContainers');
    const teamCardContainerLists = $('#team-list-container');

    teamCardContainerLists.innerHTML = '';
    teamCardContainerLists.innerHTML = makeAddTeamButton;
    for (const teamInfo of teamInfos.reverse()) {
      teamCardContainerLists.insertAdjacentHTML(
        'afterbegin',
        makeTeamCardContainer(teamInfo)
      );
    }
  }

  async render() {
    console.log('render');
    const response = await this.API.get(`${this.API.teamURL}`);
    const teamInfos = await response.json();
    this.renderTeamCardContainers(teamInfos);
    await this.addEvents();
  }

  async init() {
    await this.render();
  }
}

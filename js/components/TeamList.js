import {
  teamCardTemplate,
  addTeamButtonContainerTemplate,
} from '../utils/template.js'
import { isString, validateNewInstance, validateElement } from '../utils/validator.js'

export default function TeamList({ teams, $target, onAddTeam }) {
  validateNewInstance(new.target, TeamList)
  validateElement($target)

  const onClickHandler = (e) => {
    const $target = e.target
    const $targetElem = $target.closest('button')

    if (!$targetElem || !$targetElem.classList.contains('ripple')) {
      return
    }
    const teamName = prompt('팀 이름을 입력하세요')

    if (!isString(teamName)) {
      return
    }
    onAddTeam(teamName.trim())
  }

  this.render = function () {
    this.$target.innerHTML = `${this.teams
      .map(teamCardTemplate)
      .join('')}${addTeamButtonContainerTemplate}`
  }

  this.setState = function (nextData) {
    this.teams = nextData
    this.render()
  }

  this.init = function () {
    this.teams = teams
    this.$target = $target

    this.$target.addEventListener('click', onClickHandler)
    this.render()
  }

  this.init()
}

import {
  teamCardTemplate,
  addTeamButtonContainerTemplate,
} from '../utils/template.js'
import { isString } from '../utils/validator.js'

export default function TeamList({ teams, $target, onAddTeam }) {
  if (!new.target) {
    throw new Error('TeamList must be called with new')
  }

  if (!$target) {
    throw new Error('$target must be injected')
  }

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

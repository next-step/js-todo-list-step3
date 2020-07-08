export default function UserTitle({ teamName, $target }) {
  if (!new.target) {
    throw new Error('UserTitle must be called with new')
  }

  if (!$target) {
    throw new Error('$target must be injected')
  }

  this.render = function () {
    this.$teamName.innerHTML = this.teamName
  }

  this.setState = function (nextData) {
    this.teamName = nextData
    this.render()
  }

  this.init = function () {
    this.teamName = teamName
    this.$target = $target

    this.$teamName = this.$target.querySelector('strong')
    this.render()
  }

  this.init()
}

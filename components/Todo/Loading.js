export default function Loading({ $target }) {
  if (new.target !== Loading) return new Loading({ selector })

  this.init = () => {
    this.$target = $target
  }

  this.render = (visible) => {
    if (visible) {
      this.$target.style.display = 'block'
      return
    }
    this.$target.style.display = 'none'
  }

  this.init()
}

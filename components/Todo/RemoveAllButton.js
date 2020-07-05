export default function RemoveAllButton({ $target }) {
  if (new.target !== RemoveAllButton) {
    return new RemoveAllButton({ $target })
  }

  this.$target = $target

  this.init = () => {
    const $button = document.createElement('button')
    $button.className = 'clear-completed'
    $button.innerHTML = '모두 삭제'
    this.$target.appendChild($button)
  }

  this.init()
}

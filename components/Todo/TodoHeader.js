TodoHeader.prototype.init = function () {
  this.$target.innerHTML = this.textContent
}

export default function TodoHeader({ $target, textContent }) {
  this.$target = $target
  this.textContent = textContent
  this.init()
}

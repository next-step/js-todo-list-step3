export default function Header({ selector, textContent }) {
  if (new.target !== Header) {
    return new Header({ selector, textContent })
  }
  this.init = () => {
    const $target = document.querySelector(selector)
    $target.innerHTML = textContent
  }
  this.init()
}

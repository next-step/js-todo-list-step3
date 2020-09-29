export default class Header {
  constructor(memberId) {
    if (memberId) {
      this.titleElement = document.querySelector(
        `[id="${memberId}"] .user-title`
      );
    } else {
      this.titleElement = document.querySelector('#header-title');
    }
    this.targetName = '';
  }

  setState(targetName) {
    this.targetName = targetName;
    this.render();
  }

  render() {
    this.titleElement.innerHTML = `<span><strong>${this.targetName}</strong>'s Todo List</span>`;
  }
}

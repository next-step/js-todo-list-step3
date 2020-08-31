export default class TodoHeader {
  constructor(memberId) {
    if (memberId) {
      this.titleElement = document.querySelector(`#${memberId} .user-title`);
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

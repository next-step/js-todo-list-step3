export default function Title(parent, domElementType, id) {
  this.$parent = parent;
  this.teamName = ''
  this.dom = {};

  this.setDom = () => {
    this.dom = document.createElement(domElementType);
    this.dom.id = id;
    this.$parent.prepend(this.dom);
  }  

  this.setState = (selectedteamName) => {
    this.teamName = selectedteamName ?? 'Team';
    this.setDom();
    this.render();
  }

  this.render = () => {
    this.dom.innerHTML = `<span><strong>${this.teamName}</strong>'s Todo Lists</span>`
  }
}
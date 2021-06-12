export default function Title(parent) {
  this.$parent = parent;
  this.teamName = ''
  this.dom = {};

  this.setDom = () => {
    this.dom = document.createElement('h1');
    this.dom.id = 'team-title'
    this.dom.dataset.teamname = this.teamName;
    this.$parent.prepend(this.dom);
  }  

  this.setState = (selectedteamName) => {
    this.teamName = selectedteamName;
    this.setDom();
    this.render();
  }

  this.render = () => {
    console.log(this.dom)
    this.dom.innerHTML = `
    <span>
      <strong>
        ${this.teamName}
      </strong>
        's Todo Lists
    </span>
    `
  }
}
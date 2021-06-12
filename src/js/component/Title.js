export default function Title(parent, teamName) {
  this.$parent = parent;
  this.$title = document.createElement('h1');
  this.$title.id = 'team-title'
  this.$title.dataset.teamname = teamName;
  this.$parent.prepend(this.$title);

  this.render = () => {
    console.log(this.$title)
    this.$title.innerHTML = `
    <span>
      <strong>
        ${teamName}
      </strong>
        's Todo Lists
    </span>
    `
  }
}
export default function MemberTitle(titleEl, memberApp) {
  this.render = () => {
    titleEl.innerHTML = `
        <span><strong>${memberApp.name}</strong>'s Todo List</span>
    `;
  };
}

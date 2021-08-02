export default {
  template: (title) => `
  <h1 id="user-title" data-username=${title}>
    <span><strong>${title}</strong>'s Todo List</span>
  </h1>`
}
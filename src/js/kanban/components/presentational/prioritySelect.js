export default {
  defaultTemplate: `
    <select class="chip select">
      <option value="0" selected>순위</option>
      <option value="1">1순위</option>
      <option value="2">2순위</option>
    </select>
  `,
  determinedTemplate: (priority) => `
    <span class="chip ${priority === 'FIRST' ? 'primary' : 'secondary'}">
    ${priority === 'FIRST' ? '1순위' : '2순위'}
    </span>
    <select class="chip select hidden">
      <option value="0" selected>순위</option>
      <option value="1">1순위</option>
      <option value="2">2순위</option>
    </select>
  `
}
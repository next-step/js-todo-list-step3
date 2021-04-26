const temaCardView = (id, name) => `
<div class="team-card-container" dataset-id=${id}>
<a href="/kanban.html" class="card">
  <div class="card-title">
    ${name}
  </div>
</a>
</div>
`;

export const teamListView = (data = []) => {
  const list = data.map((element) => temaCardView(element._id, element.name));
  return list.join("");
};

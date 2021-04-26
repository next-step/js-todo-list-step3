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

export const loadingView = ` <div>로딩중...😎</div>`;

export const EmptyView = `<div>아무것도 ..없어요!</div>`;

export const ErrorView = `<div> 잠시 후 다시 시도해주세요 🥶 </div>`;

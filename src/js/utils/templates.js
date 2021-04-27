const teamCardView = (id, name) => `
<div class="team-card-container" dataset-id=${id}>
<a href="/kanban.html?id=${id}" class="card">
  <div class="card-title">
    ${name}
  </div>
</a>
</div>
`;

const teamAddBtnView = `
<button id="add-team-button" class="ripple">
  <span class="material-icons">add</span>
</button>`;

export const teamListView = (data = []) => {
  const list = data.map((element) => teamCardView(element._id, element.name));
  list.push(teamAddBtnView);
  return list.join("");
};

export const teamTitleView = (title) =>
  `<span><strong>${title}</strong>'s Todo List</span>`;

export const MemberTitleView = (name) =>
  `
<h2>
  <span><strong>${name}</strong>'s Todo List</span>
</h2>
`;

const todoItemView = () => {
  return ``;
};

export const todoView = () => {};

export const loadingView = ` <div>로딩중...😎</div>`;

export const EmptyView = `<div>아무것도 ..없어요!</div>`;

export const ErrorView = `<div> 잠시 후 다시 시도해주세요 🥶 </div>`;

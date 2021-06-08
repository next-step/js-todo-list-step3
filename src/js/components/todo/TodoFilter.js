export class TodoFilter {
  constructor({ userId, onFilterItem, onDeleteAllItems }) {
    this.userId = userId;
    this.todoFilters = document
      .getElementById(this.userId)
      .querySelector(".filters");
    this.deleteAllButton = document
      .getElementById(this.userId)
      .querySelector(".clear-completed");
    this.handleFilterItem = onFilterItem;
    this.handleDeleteAllItems = onDeleteAllItems;

    this.init();
  }

  init() {
    this.todoFilters.addEventListener("click", (e) =>
      this.todoFiltersClickHandler(e)
    );

    this.deleteAllButton.addEventListener("click", (e) =>
      this.deleteAllButtonClickHandler(e)
    );
  }

  todoFiltersClickHandler(e) {
    const target = e.target;
    const selectedEls = this.todoFilters.querySelectorAll("a.selected");
    const filter = target.classList.contains("active")
      ? "active"
      : e.target.classList.contains("completed")
      ? "completed"
      : e.target.classList.contains("priority")
      ? "priority"
      : "all";

    e.preventDefault();
    this.handleFilterItem(filter);
    selectedEls.forEach((el) => el.classList.remove("selected"));
    target.classList.add("selected");
  }

  deleteAllButtonClickHandler(e) {
    this.handleDeleteAllItems();
  }
}

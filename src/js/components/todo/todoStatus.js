export default function TodoStatus() {
  this.status = {};

  this.render = (id, status) => {
    id in this.status
      ? addStatus(id, STATUS[status])
      : (this.status[id] = STATUS[status]);
  };

  const addStatus = (id, status) => {
    status === STATUS.all ? delete this.status[id] : (this.status[id] = status);
  };

  this.check = (id, items) =>
    id in this.status ? STATUS_ITEMS[this.status[id]](items) : items;
}

const STATUS = {
  all: "all",
  priority: "priority",
  active: "active",
  completed: "completed",
};

const STATUS_ITEMS = {
  all: (items) => items,
  priority: (items) =>
    [...items].sort((item1, item2) => item1.compareTo(item2)),
  active: (items) => items.filter((item) => !item.isCompleted()),
  completed: (items) => items.filter((item) => item.isCompleted()),
};

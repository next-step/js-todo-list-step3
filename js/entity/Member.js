class Member {
  constructor({ _id, name, todoList = [] }) {
    this._id = _id;
    this.name = name;
    this.itemMap = todoList.reduce((map, item) => {
      map.set(item._id, item);
      return map;
    }, new Map());
  }

  // getItems() {
  //   return Array.from([...this.itemMap.values()]);
  // }

  // addItem(item) {
  //   if (this.itemMap.has(item._id)) {
  //     throw new Error(item._id + 'already exists.');
  //   }
  //   this.itemMap.set(item._id, item);
  // }

  // updateItem(item) {
  //   this.itemMap.set(item._id, item);
  // }

  // deleteItem(item) {
  //   this.itemMap.delete(item._id);
  // }
}

export default Member;

class Item {
  constructor({ _id, contents, isCompleted }) {
    this._id = _id;
    this.contents = contents;
    this.isCompleted = isCompleted;
  }

  //   toggle() {
  //     this.isCompleted = !this.isCompleted;
  //   }
}

export default Item;

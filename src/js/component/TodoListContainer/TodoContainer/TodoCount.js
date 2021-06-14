export default function TodoCount(parent) {
  this.$parent = parent;
  this.dom;

  this.setDom = () => {
    this.dom = document.createElement('div');
    this.dom.className = 'count-container';
    this.$parent.append(this.dom);
    console.log(this.dom);
  }

  this.setState = (countTodo) => {
    this.setDom();
    const countHtml = `
    <span class="todo-count">
      총 <strong>${countTodo}</strong> 개
    </span>
    `
    this.dom.insertAdjacentHTML('afterbegin', countHtml);
  } 
}
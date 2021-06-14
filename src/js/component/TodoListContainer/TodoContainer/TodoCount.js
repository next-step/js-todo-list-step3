export default function TodoCount(parent) {
  this.$parent = parent;
  this.dom;


  this.setDom = () => {
    this.dom = document.createElement('span');
    this.dom.className = 'todo-count';
    this.$parent.append(this.dom);
  }

  this.setState = (countTodo) => {
    this.setDom();
    const countHtml = `
    총 <strong>${countTodo}</strong> 개
    `
    this.dom.innerHTML = countHtml;
  } 
}
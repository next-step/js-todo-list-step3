export default function TodoInput(parent, { onAdd }) {
  this.$parent = parent;
  this.dom = {};

  this.setDom = () => {
    this.dom = document.createElement('section');
    this.dom.className = 'input-container';
    this.dom.innerHTML = '<input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />'
    this.$parent.append(this.dom);
  }

  this.setEvent = () => {
    const $todoInputs = document.querySelectorAll('.new-todo');
    [...$todoInputs].forEach(input => input.addEventListener('keyup', event => this.addTodoItem(event)));
  }
  
  this.addTodoItem = ({key, target}) => {
    console.log(target);
    if (!target.matches('.new-todo')) return;
    
    if (key === 'Enter') {
      console.log(1)
      onAdd(target.value.trim());
      target.value = "";
    }
  }

  this.setState = async () => {
    await this.setDom();
    await this.setEvent();
  }
}
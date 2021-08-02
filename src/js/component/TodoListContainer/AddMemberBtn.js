export default function AddMemberBtn(parent, { onAdd }) {
  this.$parent = parent;
  this.dom = {};

  this.setDom = () => {
    this.dom = document.createElement('li'); 
    this.dom.classList.add("add-user-button-container")
    this.$parent.append(this.dom);
    
  }

  this.render = () => {
    this.dom.innerHTML = `
    <button id="add-user-button" class="ripple">
      <span class="material-icons">add</span>
    </button>
    `;
    this.setEvent();
  }

  this.setEvent = () => {
    const addBtn = document.querySelector('.add-user-button-container');
    addBtn.addEventListener('click', () =>this.onAddMemberHandler());
  }

  this.onAddMemberHandler = () => {
    const nameNewMember = prompt('이름을 입력해주세요.');
    onAdd(nameNewMember);
  }

  this.setState = () => {
    this.setDom();
    this.render();
  }

}
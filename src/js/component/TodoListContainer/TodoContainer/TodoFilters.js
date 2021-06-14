export default function TodoFilters(parent, {onShowAll, onActive, onCompleted}) {
  this.$parent = parent
  this.dom;

  this.setDom = () => {
    this.dom = document.createElement('ul');
    this.dom.className = 'filters';
    this.$parent.append(this.dom);
  }

  this.setState = () => {
    this.setDom();
    this.dom.insertAdjacentHTML('afterbegin', this.template);
    this.setEvent();
  }

  this.template = `
  <li>
    <a href="#all" class="selected">전체보기</a>
  </li>
  <li>
    <a href="#active" class="active">해야할 일</a>
  </li>
  <li>
    <a href="#completed" class="complete">완료한 일</a>
  </li>
  `

  this.setEvent = () => {
    const $all = document.querySelector('.selected');
    const $active = document.querySelector('.active');
    const $completed = document.querySelector('.complete');
    $all.addEventListener('click',(event) => this.onShowAllHandler(event))
    $active.addEventListener('click',(event) => this.onShowActiveHandler(event))
    $completed.addEventListener('click',(event) => this.onShowCompletedHandler(event))

  }

  this.onShowAllHandler = ({target}) => {
    onShowAll();
  }

  this.onShowActiveHandler = ({target}) => {
    onActive();
  }

  this.onShowCompletedHandler = ({target}) => {
    onCompleted();
  }
}
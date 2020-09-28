import Component from '../../core/Component.js';

export default class AddButton extends Component {
  constructor($parent) {
    super($parent);
    this.render();
  }

  initEventListener() {
    this.$target.addEventListener('click', () => {
      const result = prompt('팀 이름을 입력해주세요');
    });
  }

  render = () => {
    this.$target.innerHTML = `
    	<div class="add-team-button-container">
    		<button id="add-team-button" class="ripple">
    			<span class="material-icons">add</span>
    		</button>
    	</div>
    `;
  };
}

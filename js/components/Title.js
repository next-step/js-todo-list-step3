import Component from '../core/Component.js';

export default class Title extends Component {
  constructor($parent, domElement, props) {
    super($parent, domElement, props);
    this.props.title.subscribe(this.render);
    this.render();
  }

  render = () => {
    this.$target.innerHTML = `
				<span><strong>${this.props.title.value}</strong>'s Todo Lists</span>
		`;
  };
}

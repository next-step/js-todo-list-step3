import Component from '../core/Component.js';

export default class Title extends Component {
  constructor($parent, domElement, props) {
    super($parent, domElement, props);
  }

  render() {
    this.$target.innerHTML = `
				<span><strong>${this.props.title}</strong>'s Todo Lists</span>
		`;
  }
}

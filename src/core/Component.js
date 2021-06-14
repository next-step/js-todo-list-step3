export default class Component {
  constructor($element, props) {
    this.$element = $element;
    this.props = props;
    this.setEvent();
    this.render();
  }
  mounted() {}
  setEvent() {}
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
  template() {
    return '';
  }
  render() {}
}

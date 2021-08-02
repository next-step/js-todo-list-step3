export default class Component {
  constructor($element, props) {
    this.$element = $element;
    this.props = props;
    this.setup();
    this.setEvent();
  }
  setup() {}
  setEvent() {}
  mounted() {}
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
  template() {
    return '';
  }
  render() {
    this.$element.innerHTML = this.template();
    this.mounted();
  }
}

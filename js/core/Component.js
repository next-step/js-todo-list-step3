export default class Component {
  $target;
  props;

  constructor(domElementType, props = {}) {
    this.$target = this.create$Target(domElementType, props['class']);
    this.props = props;

    this.initEventListener();
    this.render();
  }

  create$Target = (domElementType, classNames = []) => {
    const $target = document.createElement(domElementType);

    $target.classList.add(...classNames);
    $target.parentNode.appendChild($target);

    return $target;
  };

  initEventListener() {}
  render() {}
}

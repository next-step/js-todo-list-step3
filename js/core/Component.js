export default class Component {
  $parent;
  $target;
  props;

  constructor($parent, props = {}, domElementType = 'div') {
    if ($parent) {
      this.$target = this.create$Target(
        $parent,
        domElementType,
        props['id'],
        props['class']
      );
      this.$parent = $parent;
      this.props = props;
    }

    this.initEventListener();
    this.render();
  }

  create$Target = ($parent, domElementType, id = '', classNames = []) => {
    const $target = document.createElement(domElementType);

    $target.id = id;
    $target.classList.add(...classNames);
    $parent.appendChild($target);

    return $target;
  };

  initEventListener() {}
  render() {}
}

import { debounceOneFrame } from "../utils/index.js";

export const Component = class {

  $state = {}; $props; $render;

  constructor(target, state, props) {
    this.$props = props;

    let isMounted = false;
    this.$render = debounceOneFrame(() => {
      target.innerHTML = this.render();
      if (!isMounted) this.componentDidMount();
    });

    this.setEvent(target);
    this.setState(state);

  }

  setEvent (target) {}
  render () { return '' }
  componentDidMount () {}

  setState (payload) {
    this.$state = { ...this.$state, ...payload };
    this.$render();
  }

}
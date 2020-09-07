import { debounceOneFrame } from "../utils/index.js";

export const Component = class {

  $state; $props; $render;

  constructor(target, state = {}, props = {}) {
    this.$props = props;
    this.$state = state;

    let isMounted = false;
    this.$render = debounceOneFrame(() => {
      target.innerHTML = this.render();
      if (!isMounted) this.componentDidMount();
    });

    this.componentWillMount();
    this.setEvent(target);
    this.setState(state);

  }

  componentWillMount () {}
  setEvent (target) {}
  render () { return '' }
  componentDidMount () {}

  setState (payload) {
    this.$state = { ...this.$state, ...payload };
    this.$render();
  }

}
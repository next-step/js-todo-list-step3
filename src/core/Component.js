import { debounceOneFrame } from "../utils/index.js";

export const Component = class {

  $state; $props; $render;

  constructor(target, state = {}, props = {}) {
    this.$props = props;
    this.$state = state;

    let isMounted = false;
    this.$render = debounceOneFrame(() => {
      target.innerHTML = this.render(this.$state, this.$props);
      this.componentDidUpdate(target);
      if (!isMounted) this.componentDidMount();
    });

    this.componentWillMount();
    this.setEvent(target, props);
    this.setState(state);

  }

  componentWillMount () {}
  setEvent (target, props) {}
  render (state) { return '' }
  componentDidMount () {}
  componentDidUpdate (target) {}

  setState (payload) {
    this.$state = { ...this.$state, ...payload };
    this.$render();
  }

}
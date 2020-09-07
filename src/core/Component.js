import {addEventBubblingListener, debounceOneFrame} from "../utils/index.js";

export const Component = class {

  $target; $state = {}; $props; $render;

  constructor(target, props = {}) {
    this.$target = target;
    this.$props = props;

    let isMounted = false;
    this.$render = debounceOneFrame(() => {
      target.innerHTML = this.render(this.$state, this.$props);
      this.componentDidUpdate();
      if (!isMounted) this.componentDidMount();
    });

    this.componentWillMount();
    this.setEvent(target = this.$target, props);
    this.setState(this.$state);

  }

  componentWillMount () {}
  setEvent (target, props) {}
  render () { return '' }
  componentDidMount () {}
  componentDidUpdate () {}

  setState (payload) {
    this.$state = { ...this.$state, ...payload };
    this.$render();
  }

  addEvent (ref, eventType, callback) {
    addEventBubblingListener(this.$target, `[data-ref="${ref}"]`, eventType, callback);
  }

}
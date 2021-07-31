import { observable, observe } from "./observer.js";

export default class Component {
  $target;
  $props;
  $state;
  constructor($target, $props = {}) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.setEvent();
  }

  async setup(){
    this.$state = observable({});
    observe(() => {
      this.render();
      this.setEvent();
      this.mounted();
    });
  };

  mounted(){};
  template(){ return '' };
  render(){
    this.$target.innerHTML = this.template();
    this.mounted();
  }
  setEvent(){};
  addEvent(eventType, action, callback) {
    const isTarget = target => target.dataset.action === action;
    this.$target.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return;
      callback(event);
    })
  }
}
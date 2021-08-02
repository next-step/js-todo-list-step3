import { observable, observe } from "./observer.js";
import { store } from "../store/index.js";

export default class Component {
  $target;
  $props;
  $state;
  constructor($target, $props = {}) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
  }
  
  async setup(){
    await this.asyncData();
    this.$state = observable(this.initState());
    observe(() => {
      this.setEvent();
      this.render();
    });
  };

  asyncData(){};
  initState(){ return {} };
  mounted(){};
  template(){ return '' };
  render(){
    this.$target.innerHTML = this.template();
    this.mounted();
  }
  setState(nextState){
    this.$state = { ...this.$state, ...nextState };
    this.render();
  }
  setEvent(){};
  addEvent(eventType, action, callback) {
    this.$target.addEventListener(eventType, async (event) => {
      if (event.target.dataset.action === action)
        callback(event);
        await store.dispatch('FETCH_TEAM_TODOLIST');
    })
  }
}
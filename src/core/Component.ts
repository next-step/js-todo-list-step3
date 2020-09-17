import {addEventBubblingListener, debounceOneFrame} from "../utils";

export const Component = class<T> {

  protected $state?: T;

  constructor(
    protected readonly $target: HTMLElement,
    protected readonly $props: Object = {}
  ) {
    this.setup();
  }

  private async setup () {
    await this.componentInit();
    this.setEvent();
    this.setState(this.$state);
    this.componentDidMount();
  }

  public $render = debounceOneFrame(() => {
    this.$target.innerHTML = this.render();
    this.componentDidUpdate();
  });

  protected componentInit () {}
  protected setEvent () {}
  protected render () { return '' }
  protected componentDidMount () {}
  protected componentDidUpdate () {}

  protected setState (payload: any) {
    if (!this.validate()) return;
    this.$state = { ...this.$state, ...payload };
    this.$render();
  }

  protected addEvent (ref: HTMLElement, eventType: Event, callback: Function) {
    addEventBubblingListener(this.$target, `[data-ref="${ref}"]`, eventType, callback);
  }

  private validate (): boolean {
    return !this.$target.parentNode === null;
  }

}

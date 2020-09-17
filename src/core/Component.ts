import {addEventBubblingListener, debounceOneFrame} from "../utils";

export class Component<T> {

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

  protected componentInit () {}
  protected setEvent () {}
  protected componentDidMount () {}
  protected componentDidUpdate () {}

  protected setState (payload: any) {
    if (!this.validate()) return;
    this.$state = { ...this.$state, ...payload };
    this.render();
  }

  protected addEvent (ref: HTMLElement, eventType: Event, callback: Function) {
    addEventBubblingListener(this.$target, `[data-ref="${ref}"]`, eventType, callback);
  }

  public render = debounceOneFrame(() => {
    this.$target.innerHTML = this.template();
    this.componentDidUpdate();
  });
  public template () { return '' }
  public validate (): boolean {
    return !this.$target.parentNode === null;
  }

}

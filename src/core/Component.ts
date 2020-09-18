import {addEventBubblingListener, debounceOneFrame} from "@/utils";
import {Store} from "./Store";
import {ComponentConstructable} from "@/domains";

export interface ChildrenProps {
  [k: string]: {
    constructor: ComponentConstructable,
    props?: any
  }
}

export class Component<T> {

  protected $state?: T;
  protected $stores: Store<any>[] = [];
  protected $children: ChildrenProps = {};

  constructor(
    protected readonly $target: HTMLElement|Element,
    protected readonly $props: Object = {}
  ) {
    this.setup();
  }

  private async setup () {
    await this.componentInit();
    this.subscribeStore();
    this.setEvent();
    this.setState(this.$state);
    this.componentDidMount();
    this.buildChildren();
  }

  private subscribeStore () {
    this.$stores.forEach(store => store.addObserver(this));
  }

  private buildChildren () {
    this.$target.querySelectorAll('[data-component]').forEach((target: Element) => {
      const componentName: string = (target as HTMLElement).dataset.component!;
      const { constructor, props } = this.$children[componentName];
      new constructor(props);
    })
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

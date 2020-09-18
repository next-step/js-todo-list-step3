import {addEventBubblingListener, debounceOneFrame} from "@/utils";
import {Store} from "./Store";
import {ComponentConstructable, Events} from "@/domains";

export interface ChildrenProp {
  constructor: ComponentConstructable,
  props?: any
}

export type ChildrenProps = Record<string, ChildrenProp>;

export class Component<T> {

  protected $state?: T;
  protected $stores: Store<any>[] = [];
  protected $children: ChildrenProps = {};

  constructor(
    protected readonly $target: HTMLElement,
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

  protected componentInit (): void {}
  protected setEvent (): void {}
  protected componentDidMount (): void {}
  protected componentDidUpdate (): void {}

  protected setState (payload: any) {
    if (!this.validate()) return;
    this.$state = { ...this.$state, ...payload };
    this.render();
  }

  protected addEvent (ref: string, eventType: string, callback: (event: Events) => void) {
    addEventBubblingListener(this.$target, `[data-ref="${ref}"]`, eventType, callback);
  }

  public render = debounceOneFrame(() => {
    this.$target.innerHTML = this.template();
    this.componentDidUpdate();
  });

  public template (): string {
    return ''
  }

  public validate (): boolean {
    return !this.$target.parentNode === null;
  }

}

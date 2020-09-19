import {addEventBubblingListener, debounceOneFrame, selectAllElement} from "@/utils";
import {Store} from "./Store";
import {CommonEvent, ComponentConstructable, PickEvent} from "@/domains";

export interface ChildrenProp {
  constructor: ComponentConstructable,
  props?: any
}

export type ChildrenProps = Record<string, ChildrenProp>;

export class Component<Props = {}, State = {}> {

  protected $state?: State;
  protected $stores: Store<any>[] = [];
  protected $children: ChildrenProps = {};

  constructor(
    protected readonly $target: HTMLElement,
    protected readonly $props?: Props
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
    selectAllElement('[data-component]', this.$target).forEach(target => {
      const componentName = target.dataset.component as string;
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

  protected addEvent <T = CommonEvent>(
    ref: string,
    eventType: string,
    callback: (event: PickEvent<T>) => void
  ) {
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

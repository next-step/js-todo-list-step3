import {addEventBubblingListener, selectAllElement} from "@/utils";
import {CommonEvent, ComponentConstructable, PickEvent} from "@/domains";
import {observe, observable} from "@/core/Observer";

export interface ChildrenProp {
  constructor: ComponentConstructable,
  props?: any
}

export type ChildrenProps = Record<string, ChildrenProp>;

export class Component<Props = {}, State extends Record<string, any> = {} > {

  protected $state?: State;
  protected $children: ChildrenProps = {};

  constructor(
    protected readonly $target: HTMLElement,
    protected readonly $props?: Props
  ) {
    this.setup();
  }

  private async setup () {
    await this.componentInit();
    this.$state = observable(this.$state);
    this.setEvent();
    observe(this.render);
  }

  private buildChildren () {
    selectAllElement('[data-component]', this.$target).forEach(target => {
      const componentName = target.dataset.component as string;
      const { constructor, props } = this.$children[componentName];
      new constructor(target, props);
    })
  }

  protected componentInit (): Promise<any> | void {}
  protected setEvent (): void {}
  protected componentDidMount (): void {}

  protected template (): string {
    return ''
  }

  protected setState (payload: Record<keyof State, any>) {
    Object.entries(payload)
          .forEach(([key, value]: [ keyof State, any]) => {
            this.$state![key] = value;
          });
  }

  protected addEvent <T = CommonEvent>(
    ref: string,
    eventType: string,
    callback: (event: PickEvent<T>) => void
  ) {
    addEventBubblingListener(this.$target, `[data-ref="${ref}"]`, eventType, callback);
  }

  public render = () => {
    this.$target.innerHTML = this.template();
    this.componentDidMount();
    this.buildChildren();
  };

}

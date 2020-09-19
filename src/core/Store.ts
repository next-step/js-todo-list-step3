import { Component } from "./Component";

export type Getter<T> = (state: T) => unknown;
export type Getters<T> = Record<string, Getter<T>>;
export type Mutations<T> = Record<string, (state: T, payload: any) => void>;
export interface ActionContext<T> {
  state: T,
  commit: (key: string, payload: any) => void,
  dispatch: (key: string, payload?: any) => Promise<unknown> | void,
}
export type Actions<T> = Record<string, (context: ActionContext<T>, payload?: any) => Promise<unknown> | void>;
export interface StoreProps<T> {
  state: T
  getters?: Getters<T>
  mutations?: Mutations<T>
  actions?: Actions<T>
}

export class Store<T> {

  public $state: T;
  public readonly $getters: Getters<T>;
  private readonly mutations: Mutations<T>;
  private readonly actions: Actions<T>;
  private readonly observers: Set<Component> = new Set();

  constructor({ state, getters = {}, mutations = {}, actions = {} }: StoreProps<T>) {
    this.$state = state;
    this.$getters = Object.entries(getters)
                          .reduce((getters, [key, getter]) => (
                            Object.defineProperty(getters, key, {
                              get: () => getter(this.$state)
                            }), getters), {});
    this.mutations = mutations;
    this.actions = actions;
  }

  public commit (key: string, payload: any): void {
    const newState: T = { ...this.$state };
    this.mutations[key](newState, payload);
    this.setState(newState);
  }

  public dispatch (key: string, payload?: any): Promise<unknown> | void {
    return this.actions[key]({
      commit: (key: string, payload: any) => this.commit(key, payload),
      dispatch: (key: string, payload: any) => this.dispatch(key, payload),
      state: { ...this.$state },
    }, payload);
  }

  public addObserver (...components: Component[]) {
    components.forEach(component => this.observers.add(component));
  }

  private setState (newState: T) {
    this.$state = { ...newState };
    this.observers.forEach(observer => observer.validate() && observer.render())
  }
}
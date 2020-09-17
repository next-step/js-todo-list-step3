import { Component } from "./Component";

export interface Getters { [k: string]: any }
export interface Mutations<T> { [k: string]: (state: T, payload: any) => void }
export interface ActionContext<T> {
  state: T,
  commit: (key: string, payload: any) => void,
  dispatch: (key: string, payload: any) => Promise<any> | void,
}
export interface Actions<T> {
  [k: string]: (context: ActionContext<T>, payload: any) => Promise<any> | void
}
export interface StoreProps<T> {
  state: T
  getters: Getters
  mutations: Mutations<T>
  actions: Actions<T>
}

export class Store<T> {

  public $state: T;
  public readonly $getters: Getters;
  private readonly mutations: Mutations<T>;
  private readonly actions: Actions<T>;
  private readonly observes: Set<Component<any>> = new Set();

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

  public dispatch (key: string, payload: any) {
    this.actions[key]({
      commit: (key: string, payload: any) => this.commit(key, payload),
      dispatch: (key: string, payload: any) => this.dispatch(key, payload),
      state: { ...this.$state },
    }, payload);
  }

  public addObserve (...components: Component<any>[]) {
    components.forEach(component => this.observes.add(component));
  }

  private setState (newState: T) {
    this.$state = { ...newState };
    this.observes.forEach(observer => observer.validate() && observer.render())
  }
}
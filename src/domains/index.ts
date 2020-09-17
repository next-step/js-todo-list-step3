export interface RequestQuery { [k: string]: string }
export interface Constructable<T> {
  new(...args: any): T;
}

export interface RequestQuery { [k: string]: string }
export interface Constructable<T> {
  new(...args: any): T;
}
export * from "./TodoTeam";
export * from "./TodoMember";
export * from "./TodoItem";
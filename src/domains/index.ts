import {Component} from "@/core";

export interface RequestQuery { [k: string]: string }
export type RequestBodyValue = string | boolean | number | null | undefined
export interface RequestBody {
  [k: string]: RequestBodyValue | RequestBodyValue[] | { [k: string]: RequestBodyValue }
}
export interface Constructable<T> {
  new(...args: any): T;
}
export type ComponentConstructable = Constructable<Component<any>>;

export * from "./TodoTeam";
export * from "./TodoMember";
export * from "./TodoItem";
import {Component} from "@/core";

export type RequestQuery = Record<string, string>;

export type RequestBodyValue = string | boolean | number | null | undefined;

export type Events = Event | MouseEvent | KeyboardEvent | void;

export type RequestBody = Record<string, RequestBodyValue | RequestBodyValue[] | Record<string, RequestBodyValue>>;

export interface Constructable<T> {
  new(...args: any): T;
}

export type ComponentConstructable = Constructable<Component<any>>;

export * from "./TodoTeam";
export * from "./TodoMember";
export * from "./TodoItem";
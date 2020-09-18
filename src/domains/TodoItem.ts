import {PriorityTypes} from "@/constants";

export interface TodoItem {
  _id: string;
  contents: string;
  priority: PriorityTypes;
  isCompleted: boolean;
}

export interface TodoItemVO {
  contents?: string;
  priority?: PriorityTypes;
}
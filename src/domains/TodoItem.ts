export interface TodoItem {
  _id: string;
  contents: string;
  priority: number;
  isCompleted: boolean;
}

export interface TodoItemVO {
  contents?: string;
  priority?: number;
}
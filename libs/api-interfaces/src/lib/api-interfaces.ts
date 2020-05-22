export interface ToDo {
  description: string;
  dueDate: Date;
}

export interface Message {
  message: string;
}

export class CreateTodoDto {
  readonly description: string;
  readonly dueDate: Date;
}

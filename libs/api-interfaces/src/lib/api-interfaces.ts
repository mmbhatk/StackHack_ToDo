import * as mongoose from 'mongoose';

export interface ToDo extends mongoose.Document {
  id: any;
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

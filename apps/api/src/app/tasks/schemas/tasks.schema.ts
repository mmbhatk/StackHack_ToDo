import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task extends Document {
  @Prop()
  name: string;
  @Prop()
  dueDate: Date;
  @Prop()
  points: number;
}

@Schema()
export class Label extends Document {
  @Prop()
  lname: string;
  @Prop()
  tasks: Task[];
}

@Schema()
export class Todo extends Document {
  @Prop()
  userid: string;

  @Prop()
  name: string;

  @Prop()
  dpPic: string;

  @Prop()
  labels: Label[];
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

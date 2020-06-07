import * as mongoose from 'mongoose';

export interface ToDo extends mongoose.Document {
  id: any;
  description: string;
  points: number;
  dueDate: Date;
}

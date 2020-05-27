import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from '../tasks/schemas/tasks.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Todo.name) private readonly taskModel: Model<Todo>
  ) {}

  async create(userid: string): Promise<Todo> {
    const createdTodo = new this.taskModel({
      userid: userid,
      labels: [
        {
          lname: 'Personal',
          tasks: [],
        },
        {
          lname: 'Work',
          tasks: [],
        },
      ],
    });
    return createdTodo.save();
  }
}

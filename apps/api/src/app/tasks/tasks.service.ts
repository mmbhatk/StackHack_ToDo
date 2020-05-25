import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, Todo } from './schemas/tasks.schema';
import { ToDo } from '@stack-hack-to-do/api-interfaces';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Todo.name) private readonly taskModel: Model<Todo>
  ) {}

  async create(userid: string, label: string, task: Task): Promise<any> {
    const taskWithId = {
      ...task,
      id: new Types.ObjectId(),
    };
    const user = await this.taskModel.updateOne(
      { userid: userid, 'labels.lname': label },
      {
        $push: {
          'labels.$.tasks': taskWithId,
        },
      }
    );
    if (user.ok === 1) return taskWithId;
    return {};
  }

  async findAll(userid, label): Promise<any> {
    const user = await this.taskModel.findOne({ userid });
    return user.labels.find((lab) => lab.lname === label).tasks;
  }

  async delete(userid, label, id): Promise<any> {
    return this.taskModel.updateOne(
      { userid: userid, 'labels.lname': label },
      {
        $pull: {
          'labels.$.tasks': { id: new Types.ObjectId(id) },
        },
      }
    );
  }
}

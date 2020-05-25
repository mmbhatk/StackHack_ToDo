import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/tasks.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ToDo } from '@stack-hack-to-do/api-interfaces';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<ToDo>
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<ToDo> {
    const createdTodo = new this.taskModel(createTodoDto);
    return createdTodo.save();
  }

  async findAll(): Promise<ToDo[]> {
    return this.taskModel.find().exec();
  }

  async delete(id): Promise<any> {
    return this.taskModel.deleteOne({ _id: id }, (err) => err);
  }
}

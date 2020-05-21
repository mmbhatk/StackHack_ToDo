import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/tasks.schema';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Task> {
    const createdTodo = new this.taskModel(createTodoDto);
    return createdTodo.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }
}

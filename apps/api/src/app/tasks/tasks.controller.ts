import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Task } from './schemas/tasks.schema';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createCatDto: CreateTodoDto) {
    await this.tasksService.create(createCatDto);
    return createCatDto;
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }
}

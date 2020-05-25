import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ToDo } from '@stack-hack-to-do/api-interfaces';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createCatDto: CreateTodoDto): Promise<ToDo> {
    const response = await this.tasksService.create(createCatDto);
    return response;
  }

  @Get()
  async findAll(): Promise<ToDo[]> {
    return this.tasksService.findAll();
  }

  @Delete('/:id')
  async delete(@Param('id') id: any) {
    return this.tasksService.delete(id);
  }
}

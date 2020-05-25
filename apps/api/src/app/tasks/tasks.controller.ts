import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ToDo } from '@stack-hack-to-do/api-interfaces';
import { Label, Task } from './schemas/tasks.schema';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Body('userid') userid,
    @Body('task') task,
    @Body('label') label
  ): Promise<ToDo> {
    const response = await this.tasksService.create(userid, label, task);
    return response;
  }

  @Post('/get')
  async findAll(@Body('label') label, @Body('userid') userid): Promise<ToDo[]> {
    return this.tasksService.findAll(userid, label);
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: any,
    @Body('userid') userid,
    @Body('label') label
  ) {
    return this.tasksService.delete(userid, label, id);
  }
}

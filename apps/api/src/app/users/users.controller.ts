import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Todo } from '../tasks/schemas/tasks.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body('userid') userid: string): Promise<Todo> {
    const response = await this.usersService.create(userid);
    return response;
  }
}

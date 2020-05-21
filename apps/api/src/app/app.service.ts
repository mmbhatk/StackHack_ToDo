import { Injectable } from '@nestjs/common';
import { Message, ToDo } from '@stack-hack-to-do/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }

  getTodos(): ToDo[] {
    return [
      {
        description: 'Task 1',
        dueDate: new Date(),
      },
      {
        description: 'Task 2',
        dueDate: new Date(),
      },
    ];
  }
}

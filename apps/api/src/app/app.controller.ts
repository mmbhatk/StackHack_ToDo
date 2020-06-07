import { Controller, Get } from '@nestjs/common';

import { ToDo } from '@stack-hack-to-do/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}

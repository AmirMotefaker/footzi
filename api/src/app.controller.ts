// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // این متد به درخواست‌های GET به آدرس ریشه پاسخ می‌دهد
  findAll() {
    return this.appService.findAll();
  }
}
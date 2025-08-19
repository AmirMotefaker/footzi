// api/src/app.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll() {
    return this.appService.findAll();
  }

  // -- روت جدید برای گرفتن یک بازیکن بر اساس ID --
  // دکوراتور @Get(':id') به این معنی است که این روت پارامتری به نام id در URL خواهد داشت
  // مثلاً: /1e86107a-095d-4a39-bfc0-bbf9c79ba8f9
  @Get(':id') 
  findOne(@Param('id') id: string) {
    // دکوراتور @Param('id') مقدار id را از URL استخراج کرده و در متغیر id قرار می‌دهد
    return this.appService.findOne(id);
  }
}
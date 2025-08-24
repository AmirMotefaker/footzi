// api/src/app.controller.ts
import { Controller, Get, Param, Query } from '@nestjs/common'; // <-- Query را اضافه می‌کنیم
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // متد findAll حالا یک پارامتر search اختیاری از Query String می‌گیرد
  @Get()
  findAll(@Query('search') search?: string) {
    return this.appService.findAll(search);
  }

  @Get(':id') 
  findOne(@Param('id') id: string) {
    return this.appService.findOne(id);
  }
}
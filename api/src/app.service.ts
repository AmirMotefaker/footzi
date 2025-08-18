// src/app.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerStats } from './player-stats.entity';

@Injectable()
export class AppService {
  constructor(
    // "Repository" را برای کار با جدول PlayerStats به سرویس تزریق می‌کنیم
    @InjectRepository(PlayerStats)
    private statsRepository: Repository<PlayerStats>,
  ) {}

  // یک متد جدید برای گرفتن تمام آمارها
  async findAll(): Promise<PlayerStats[]> {
    return this.statsRepository.find({
      order: {
        goals: 'DESC', // بر اساس تعداد گل به صورت نزولی مرتب کن
      },
    });
  }
}
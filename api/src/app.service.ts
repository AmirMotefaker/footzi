// api/src/app.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerStats } from './player-stats.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(PlayerStats)
    private statsRepository: Repository<PlayerStats>,
  ) {}

  async findAll(): Promise<PlayerStats[]> {
    return this.statsRepository.find({
      order: {
        full_name: 'ASC', // مرتب‌سازی بر اساس نام کامل
      },
    });
  }

  async findOne(id: string): Promise<PlayerStats | null> {
    return this.statsRepository.findOneBy({ id });
  }
}
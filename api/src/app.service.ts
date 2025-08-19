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

  // متد قبلی برای گرفتن تمام بازیکنان
  async findAll(): Promise<PlayerStats[]> {
<<<<<<< HEAD
  return this.statsRepository.find({
    order: {
      full_name: 'ASC', // مرتب‌سازی بر اساس نام کامل به صورت صعودی (الفبایی)
    },
  });
}
=======
    return this.statsRepository.find({
      order: {
        goals: 'DESC',
      },
    });
  }
>>>>>>> b7e3c7310cdd301a4f6dfe8c525db33518574998

  // -- متد جدید برای گرفتن یک بازیکن --
  async findOne(id: string): Promise<PlayerStats | null> {
    // متد findOneBy به دنبال اولین رکوردی می‌گردد که با شرط ما مطابقت دارد
    return this.statsRepository.findOneBy({ id });
  }
}
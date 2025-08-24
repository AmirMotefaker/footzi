// api/src/app.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// ۱. به جای Like، از ILike استفاده می‌کنیم
import { Repository, ILike } from 'typeorm'; 
import { PlayerStats } from './player-stats.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(PlayerStats)
    private statsRepository: Repository<PlayerStats>,
  ) {}

  async findAll(search?: string): Promise<PlayerStats[]> {
    if (search) {
      return this.statsRepository.find({
        where: {
          // ۲. جستجو را به ILike (case-Insensitive Like) تغییر می‌دهیم
          full_name: ILike(`%${search}%`), 
        },
      });
    }
    return this.statsRepository.find({
      order: {
        full_name: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<PlayerStats | null> {
    return this.statsRepository.findOneBy({ id });
  }
}
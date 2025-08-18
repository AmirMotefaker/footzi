// src/player-stats.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('player_stats_temp') // نام دقیق جدول در دیتابیس
export class PlayerStats {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  player_name: string;

  @Column()
  club_name: string;

  @Column()
  goals: number;

  @Column()
  source_url: string;
}
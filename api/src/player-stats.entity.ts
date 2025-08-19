<<<<<<< HEAD
// api/src/player-stats.entity.ts

// ✅ فقط یک خط import باید وجود داشته باشد
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('players')
=======
// src/player-stats.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('player_stats_temp') // نام دقیق جدول در دیتابیس
>>>>>>> b7e3c7310cdd301a4f6dfe8c525db33518574998
export class PlayerStats {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
<<<<<<< HEAD
  full_name: string;
  
  @Column({ nullable: true })
  known_as: string;

  @Column({ type: 'date', nullable: true })
  birth_date: string;

  @Column({ type: 'text', array: true, nullable: true })
  nationality: string[];

  @Column({ nullable: true })
  goals: number;
=======
  player_name: string;

  @Column()
  club_name: string;

  @Column()
  goals: number;

  @Column()
  source_url: string;
>>>>>>> b7e3c7310cdd301a4f6dfe8c525db33518574998
}
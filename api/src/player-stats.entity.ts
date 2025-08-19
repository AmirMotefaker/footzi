// api/src/player-stats.entity.ts

// ✅ فقط یک خط import باید وجود داشته باشد
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('players')
export class PlayerStats {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  full_name: string;
  
  @Column({ nullable: true })
  known_as: string;

  @Column({ type: 'date', nullable: true })
  birth_date: string;

  @Column({ type: 'text', array: true, nullable: true })
  nationality: string[];

  @Column({ nullable: true })
  goals: number;
}
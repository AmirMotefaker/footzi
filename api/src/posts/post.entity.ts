import { User } from '../users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

export enum PostType {
  TICKET = 'ticket',
  JERSEY = 'jersey',
  CHANT = 'chant',
  STADIUM_PHOTO = 'stadium_photo',
}

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  caption: string;

  @Column()
  image_url: string;

  @Column({
    type: 'enum',
    enum: PostType,
  })
  post_type: PostType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, user => user.posts)
  user: User;
}
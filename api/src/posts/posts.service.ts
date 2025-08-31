// api/src/posts/posts.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post, PostType } from './post.entity';
import { User } from '../users/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(caption: string, imageUrl: string, user: User): Promise<Post> {
    const newPost = this.postsRepository.create({
      caption,
      image_url: imageUrl,
      user,
      post_type: PostType.JERSEY,
    });
    return this.postsRepository.save(newPost);
  }

  // ✅ متد گمشده findAll در اینجا اضافه می‌شود
  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({
      relations: ['user'],
      order: {
        created_at: 'DESC',
      },
    });
  }
}
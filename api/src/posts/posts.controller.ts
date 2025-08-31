import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/user.entity';

class CreatePostDto {
  caption: string;
  imageUrl: string;
}

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.postsService.create(
      createPostDto.caption,
      createPostDto.imageUrl,
      req.user as User,
    );
  }

  // ✅ Endpoint جدید برای گرفتن تمام پست‌ها
  @Get()
  findAll() {
    return this.postsService.findAll();
  }
}
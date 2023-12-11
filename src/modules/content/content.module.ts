import { Module } from '@nestjs/common';

import { PostController } from './controllers/post.controller';
import { PostRepository } from './repositories';
import { PostService } from './services/post.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostService],
})
export class ContentModule {}

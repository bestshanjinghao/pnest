import { Repository } from 'typeorm';

import { CustomRepository } from '@/modules/database/decorators';

import { PostEntity } from '../entities/post.entity';

// src/modules/content/repositories/post.repository.ts
@CustomRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  buildBaseQB() {
    return this.createQueryBuilder('post');
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';

import { CreatePostDto, QueryPostDto, UpdatePostDto } from '../dtos';
import { PostService } from '../services';

@Controller('posts')
export class PostController {
  constructor(protected service: PostService) {}

  @Get()
  async list(
    @Query(
      /*
       whitelist用于过滤掉没有添加验证的器的多余属性（但是如果该属性存在于DTO中且没有添加验证器，但又不想被过滤，你可以加上@Allow装饰器）
        example（我猜的）：
          在dto中 加入
          @Allow
          attribute: string
       */
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        validationError: { target: false },
      }),
    )
    options: QueryPostDto,
  ) {
    return this.service.paginate(options);
  }

  @Get(':id')
  async detail(
    // 通过id查询文章 为什么要new一个uuid的管道呢
    /*
     在NestJS中，ParseUUIDPipe的主要作用是将传入的UUID字符串转换为UUID对象。
     这对于处理UUID类型的数据非常有用，特别是在需要验证或处理UUID的地方。
     例如，如果你正在编写一个API，你可能希望能够接受UUID作为参数，并在处理请求时使用它。
     在这种情况下，ParseUUIDPipe就可以派上用场了。
    */
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return this.service.detail(id);
  }

  @Post()
  async store(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        validationError: { target: false },
        groups: ['create'],
      }),
    )
    data: CreatePostDto,
  ) {
    return this.service.create(data);
  }

  @Patch()
  async update(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        validationError: { target: false },
        groups: ['update'],
      }),
    )
    data: UpdatePostDto,
  ) {
    return this.service.update(data);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.delete(id);
  }
}

import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';
import { toNumber } from 'lodash';

import { IsDataExist } from '@/modules/core/constraints/data.exist.constraint';
import { IsTreeUnique } from '@/modules/core/constraints/tree.unique.constraint';
import { IsTreeUniqueExist } from '@/modules/core/constraints/unique.exist.constraint';
import { DtoValidation } from '@/modules/core/decorators';
import { SelectTrashMode } from '@/modules/database/constants';
import { PaginateOptions } from '@/modules/database/types';

import { CategoryEntity } from '../entities';

@DtoValidation({ type: 'query' })
export class QueryCategoryTreeDto {
  @IsEnum(SelectTrashMode)
  @IsOptional()
  trashed?: SelectTrashMode;
}

@DtoValidation({ type: 'query' })
export class QueryCategoryDto
  extends QueryCategoryTreeDto
  implements PaginateOptions
{
  @Transform(({ value }) => toNumber(value))
  @Min(1, { message: '当前页必须大于1' })
  @IsNumber()
  @IsOptional()
  page = 1;

  @Transform(({ value }) => toNumber(value))
  @Min(1, { message: '每页显示数据必须大于1' })
  @IsNumber()
  @IsOptional()
  limit = 10;
}

/**
 * 分类新增验证
 */
@DtoValidation({ groups: ['create'] })
export class CreateCategoryDto {
  @IsTreeUnique(CategoryEntity, {
    groups: ['create'],
    message: '名称重复',
  })
  @IsTreeUniqueExist(CategoryEntity, {
    groups: ['update'],
    message: '名称重复',
  })
  @MaxLength(25, {
    always: true,
    message: '名称长度不得超过$constraint1',
  })
  @IsNotEmpty({ groups: ['create'], message: '分类名称不得为空' })
  @IsOptional({ groups: ['update'] })
  name: string;

  @IsDataExist(CategoryEntity, { always: true, message: '父分类不存在' })
  @IsUUID(undefined, { always: true, message: '父分类ID格式不正确' })
  @ValidateIf((value) => value.parent !== null && value.parent)
  @IsOptional({ always: true })
  @Transform(({ value }) => (value === 'null' ? null : value))
  parent?: string;

  @Transform(({ value }) => toNumber(value))
  @Min(0, { always: true, message: '排序值必须大于0' })
  @IsNumber(undefined, { always: true })
  @IsOptional({ always: true })
  customOrder = 0;
}

/**
 * 分类更新验证
 */
@DtoValidation({ groups: ['update'] })
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsUUID(undefined, { groups: ['update'], message: 'ID格式错误' })
  @IsDefined({ groups: ['update'], message: 'ID必须指定' })
  id: string;
}

// src/modules/core/services/config.service.ts
import { Injectable } from '@nestjs/common';
import { get } from 'lodash';

const config: Record<string, any> = {
  name: '3R教室',
};
@Injectable()
export class ConfigService {
  get<T>(key: string, defaultValue?: T): T | undefined {
    return get(config, key, defaultValue);
  }
}

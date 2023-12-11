import { Controller, Get } from '@nestjs/common';

import { ConfigService } from '@/modules/core/services/config.service';

@Controller('test')
export class TestController {
  constructor(private configService: ConfigService) {}

  @Get('name')
  async name() {
    return this.configService.get('name');
  }
}

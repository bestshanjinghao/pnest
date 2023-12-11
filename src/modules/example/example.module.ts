import { Module } from '@nestjs/common';

import { TestController } from './controllers/test.controller.controller';

@Module({
  controllers: [TestController],
})
export class ExampleModule {}

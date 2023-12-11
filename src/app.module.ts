import { Module } from '@nestjs/common';

import { ContentModule } from './modules/content/content.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [ContentModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentModule } from './modules/content/content.module';
import { CoreModule } from './modules/core/core.module';
import { DatabaseModule } from './modules/database/database.module';
import { ExampleModule } from './modules/example/example.module';
import { CoreModule } from './modules/core/core.module';

@Module({
  imports: [
    ContentModule,
    ExampleModule,
    CoreModule.forRoot({
      config: {
        name: '3R教室',
      },
    }),
    CoreModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

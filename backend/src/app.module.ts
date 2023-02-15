import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodsModule } from './foods/module/foods.module';

@Module({
  imports: [FoodsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

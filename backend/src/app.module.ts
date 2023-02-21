import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AuthModule} from "./auth/auth.module";
import { UserModule } from './user/user.module';
import {ConfigModule} from '@nestjs/config'
import { DayHistoryCreateController } from './day-history/controllers/day-history-create/day-history-create.controller';
import { DayHistoryModule } from './day-history/day-history.module';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot({isGlobal: true}), DayHistoryModule],
  controllers: [AppController, DayHistoryCreateController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AuthModule} from "./auth/auth.module";
import {PrismaService} from "./utils/prirsma.service";
import { UserModule } from './user/user.module';
import {ConfigModule} from '@nestjs/config'

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot({isGlobal: true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

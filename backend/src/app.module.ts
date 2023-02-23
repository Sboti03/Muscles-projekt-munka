import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from "./auth/auth.module";
import {UserModule} from './user/user.module';
import {ConfigModule} from '@nestjs/config'
import {ProfileModule} from "./profile/profile.module";
import {DayHistoryModule} from './day-history/day-history.module';
import { FoodsModule } from './foods/foods.module';
import { InitModule } from './init/init.module';
import {WeightHistoryModule} from "./weight-history/weight-history.module";
import { GoalsModule } from './goals/goals.module';
import { ConnectionRequestModule } from './connection-request/connection-request.module';

@Module({
    imports: [
        UserModule,
        AuthModule,
        ProfileModule,
        ConfigModule.forRoot({isGlobal: true}),
        DayHistoryModule,
        FoodsModule,
        InitModule,
        WeightHistoryModule,
        GoalsModule,
        ConnectionRequestModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}

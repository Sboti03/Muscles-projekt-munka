import {Module} from '@nestjs/common';
import {FoodsController} from '../controller/foods.controller';
import {FoodsService} from '../service/foods.service';
import {PrismaService} from "../../utils/prirsma.service";

@Module({
    controllers: [FoodsController],
    providers: [FoodsService, PrismaService]
})
export class FoodsModule {
}

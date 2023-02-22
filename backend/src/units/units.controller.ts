import {Controller, Get} from '@nestjs/common';
import {PrismaService} from "../utils/prirsma.service";
import {UnitsService} from "./units.service";

@Controller('units')
export class UnitsController {

    constructor(private unitsService:UnitsService) {
    }

    @Get('init')
    initUnits() {
        return this.unitsService.initUnits()
    }
}

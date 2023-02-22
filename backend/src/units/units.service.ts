import { Injectable } from '@nestjs/common';
import {PrismaService} from "../utils/prirsma.service";
import {Units} from "./units/units";

@Injectable()
export class UnitsService {

    constructor(private prismaService: PrismaService) {
    }


    initUnits() {
        try {
            for (const unit of Units) {
                this.prismaService.units.create({
                    data: {
                        unit: unit.unit.valueOf(),
                        unitId: unit.unitId,
                        defaultValue: unit.defaultValue
                    }
                })
            }
            return 'created'
        } catch (e) {
            return e
        }
    }
}

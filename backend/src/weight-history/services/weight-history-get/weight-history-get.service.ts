import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";

@Injectable()
export class WeightHistoryGetService {
    constructor(private prismaService:PrismaService) {
    }

    getWeightHistoryByDay() {

    }
}

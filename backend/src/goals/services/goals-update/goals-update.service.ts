import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";
import {Prisma} from "@prisma/client";

@Injectable()
export class GoalsUpdateService {
    constructor(private prismaService: PrismaService) {
    }


    updateGoalsByProfileId(profileId: number, goalsUpdateInput: Prisma.goalsUpdateInput) {
        return this.prismaService.goals.update({
            data: goalsUpdateInput,
            where: {
                profileId
            }
        })
    }
}

import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";

@Injectable()
export class AdminBlockService {
    constructor(private prismaService: PrismaService) {
    }

    blockUserByUserId(userId: number) {
       return this.prismaService.users.update({
            where: {
              userId,
            },
            data: {
                isBlocked: true,
            },
        });
    }
}

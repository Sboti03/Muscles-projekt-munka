import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";

@Injectable()
export class AdminDeleteService {
    constructor(private prismaService: PrismaService) {
    }

    deleteUserByUserId(userId: number) {
        return this.prismaService.users.delete({
            where: {
                userId,
            },
        });
    }
}

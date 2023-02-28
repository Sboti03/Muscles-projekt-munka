import {Body, Injectable, UseGuards} from '@nestjs/common';
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import ProfileCreateDto from "../../dto/profile-create.dto";
import {PrismaService} from "../../../Common/utils/prirsma.service";
import {Prisma} from "@prisma/client";

@Injectable()
export class ProfileCreateService {

    constructor(private prismaService: PrismaService) {}



    createProfile(profileCreateInput: Prisma.profileDataCreateInput) {
        return this.prismaService.profileData.create({
            data: profileCreateInput,
        })
    }
}

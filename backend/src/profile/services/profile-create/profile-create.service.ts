import {Body, Injectable, UseGuards} from '@nestjs/common';
import {JwtAccessGuard} from "../../../auth/guards/jwt-access.guard";
import ProfileCreateDto from "../../dto/profile-create.dto";
import {PrismaService} from "../../../utils/prirsma.service";
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

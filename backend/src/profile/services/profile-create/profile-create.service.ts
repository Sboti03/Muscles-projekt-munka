import {Body, Injectable, UseGuards} from '@nestjs/common';
import {JwtAccessGuard} from "../../../auth/guards/jwt-access.guard";
import ProfileCreateDto from "../../dto/profile-create.dto";
import {PrismaService} from "../../../utils/prirsma.service";

@Injectable()
export class ProfileCreateService {

    constructor(private prismaService: PrismaService) {}



    createProfile(profileCreateDto: ProfileCreateDto, userId: number) {
        return this.prismaService.profileData.create({
            data: {
                birthDay: profileCreateDto.birthDay,
                firstName: profileCreateDto.firstName,
                height: profileCreateDto.height,
                targetWeight: profileCreateDto.targetWeight,
                users: {
                    connect: {
                        userId: userId
                    }
                },
            },
        })
    }
}

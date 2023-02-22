import {Injectable} from '@nestjs/common';
import ProfileUpdateDto from "../../dto/profile-update.dto";
import {Prisma} from "@prisma/client";
import {PrismaService} from "../../../utils/prirsma.service";
import ProfileCreateDto from "../../dto/profile-create.dto";

@Injectable()
export class ProfileConvertService {

    constructor(private prismaService: PrismaService) {
    }


    convertProfileUpdateDtoToInput(profileUpdateDto: ProfileUpdateDto): Prisma.profileDataUpdateInput {
        return {
            birthDay: profileUpdateDto.birthDay,
            firstName: profileUpdateDto.firstName,
            height: profileUpdateDto.height,
            targetWeight: profileUpdateDto.targetWeight,
        }
    }

    convertProfileCreateDtoToInput(profileCreateDto: ProfileCreateDto, userId: number): Prisma.profileDataCreateInput {
        return {
            birthDay: profileCreateDto.birthDay,
            firstName: profileCreateDto.firstName,
            height: profileCreateDto.height,
            targetWeight: profileCreateDto.targetWeight,
            users: {
                connect: {
                    userId
                }
            }
        }
    }


}

import {Injectable} from '@nestjs/common';
import ProfileUpdateDto from "../../dto/profile-update.dto";
import {Prisma} from "@prisma/client";
import {PrismaService} from "../../../Common/utils/prirsma.service";
import ProfileCreateDto from "../../dto/profile-create.dto";

@Injectable()
export class ProfileConvertService {
    convertProfileUpdateDtoToInput(profileUpdateDto: ProfileUpdateDto): Prisma.profileDataUpdateInput {
        return {
            birthDay: profileUpdateDto.birthDay,
            firstName: profileUpdateDto.firstName,
            height: profileUpdateDto.height,
            lastName: profileUpdateDto.lastName,
        }
    }

    convertProfileCreateDtoToInput(profileCreateDto: ProfileCreateDto, userId: number): Prisma.profileDataCreateInput {
        return {
            birthDay: profileCreateDto.birthDay,
            firstName: profileCreateDto.firstName,
            lastName: profileCreateDto.lastName,
            height: profileCreateDto.height,
            goal: {
                create: {

                }
            },
            user: {
                connect: {
                    userId
                }
            },
        }
    }


}

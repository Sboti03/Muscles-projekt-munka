import {Injectable} from '@nestjs/common';
import ProfileUpdateDto from "../../dto/profile-update.dto";
import {Prisma} from "@prisma/client";

@Injectable()
export class ProfileGetService {


    convertProfileUpdateDtoToInput(profileUpdateDto: ProfileUpdateDto): Prisma.profileDataUpdateInput {
        return {
            birthDay: profileUpdateDto.birthDay,
            firstName: profileUpdateDto.firstName,
            height: profileUpdateDto.height,
            targetWeight: profileUpdateDto.targetWeight,
        }
    }
}

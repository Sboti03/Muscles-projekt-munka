import ProfileUpdateDto from "../../dto/profile-update.dto";
import { Prisma } from "@prisma/client";
import ProfileCreateDto from "../../dto/profile-create.dto";
export declare class ProfileConvertService {
    convertProfileUpdateDtoToInput(profileUpdateDto: ProfileUpdateDto): Prisma.profileDataUpdateInput;
    convertProfileCreateDtoToInput(profileCreateDto: ProfileCreateDto, userId: number): Prisma.profileDataCreateInput;
}

import ProfileUpdateDto from "../../dto/profile-update.dto";
import { Prisma } from "@prisma/client";
export declare class ProfileConvertService {
    convertProfileUpdateDtoToInput(profileUpdateDto: ProfileUpdateDto): Prisma.profileDataUpdateInput;
}

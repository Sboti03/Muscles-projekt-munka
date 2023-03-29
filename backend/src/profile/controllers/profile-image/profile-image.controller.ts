import {
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus, Logger,
    Param,
    Post, Res,
    UploadedFile, UseGuards,
    UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { saveImageToStorage } from "../../../Image/image-store";
import { GetCurrentUserProfileId } from "../../../auth/decorators/decorators";
import { Express, response, Response } from "express";
import { IdParam } from "../../../Common/params/id.param";
import { ProfileImageService } from "../../services/profile-image/profile-image.service";
import { AccessTokenGuard } from "../../../auth/guards/access-token.guard";

@UseGuards(AccessTokenGuard)
@Controller('profile')
export class ProfileImageController {
    constructor(private profileImageService:ProfileImageService) {
    }
    @Post('pic/upload')
    @UseInterceptors(FileInterceptor('file', saveImageToStorage))
    async uploadProfilePic(@GetCurrentUserProfileId() profileId: number, @UploadedFile() file:Express.Multer.File) {
        return this.profileImageService.uploadProfileImage(profileId, file)
    }

    @Delete('pic')
    @HttpCode(HttpStatus.OK)
    async deleteProfilePic(@GetCurrentUserProfileId() profileId: number) {
        return this.profileImageService.deleteProfilePic(profileId)
    }

    @Get('pic/me')
    async getOwnProfilePicture(@GetCurrentUserProfileId() profileId: number, @Res() res: Response) {
        Logger.log(profileId)
        const profilePicturePath = await this.profileImageService.getProfilePicturePathByProfileId(profileId)
        res.sendFile(profilePicturePath)
    }


    @Get('pic/:id')
    async getProfilePicById(@Param() idParam: IdParam, @Res() res: Response) {
        Logger.log(idParam.id)
        const profilePicturePath = await this.profileImageService.getProfilePicturePathByProfileId(idParam.id)
        res.sendFile(profilePicturePath)
    }


}

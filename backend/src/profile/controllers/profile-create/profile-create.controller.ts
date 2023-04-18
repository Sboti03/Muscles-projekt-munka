import {Controller, UseGuards} from '@nestjs/common';
import {ProfileCreateService} from "../../services/profile-create/profile-create.service";
import {ProfileUpdateService} from "../../services/profile-update/profile-update.service";
import {ProfileConvertService} from "../../services/profile-convert/profile-convert.service";
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {AuthTokenService} from "../../../auth/services/auth-token/auth-token.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('profile')
@UseGuards(AccessTokenGuard)
@Controller('profile')
export class ProfileCreateController {

    constructor(private readonly profileCreateService: ProfileCreateService,
                private profileUpdateService: ProfileUpdateService,
                private profileConvertService: ProfileConvertService,
                private authTokenService:AuthTokenService) {
    }

}

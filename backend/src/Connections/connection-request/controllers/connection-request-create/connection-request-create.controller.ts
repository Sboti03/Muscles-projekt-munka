import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Logger,
  Post,
  UseGuards
} from "@nestjs/common";
import { AccessTokenGuard } from "../../../../auth/guards/access-token.guard";
import { GetCurrentUser, GetCurrentUserId } from "../../../../auth/decorators/decorators";
import { RoleEnum } from "../../../../Common/Role/utils/roles";
import { ConnectionRequestGetService } from "../../services/connection-request-get/connection-request-get.service";
import {
  ConnectionRequestCheckService
} from "../../services/connection-request-check/connection-request-check.service";
import {
  ConnectionRequestCreateService
} from "../../services/connection-request-create/connection-request-create.service";
import { ConnectionCheckService } from "../../../connection/services/connection-check/connection-check.service";
import ConnectionRequestDto from "../../data/connection-request.dto";
import { UserCheckService } from "../../../../user/services/user-check/user-check.service";

@UseGuards(AccessTokenGuard)
@Controller("connection-request")
export class ConnectionRequestCreateController {

  constructor(private getService: ConnectionRequestGetService,
              private checkService: ConnectionRequestCheckService,
              private createService: ConnectionRequestCreateService,
              private connectionCheckService: ConnectionCheckService,
              private userCheckService: UserCheckService) {
  }

  @Post("/create")
  async createConnectionRequest(@Body() connectionRequestDto: ConnectionRequestDto,
                                @GetCurrentUserId() requesterId: number,
                                @GetCurrentUser("role") requesterRole: RoleEnum) {

    if (connectionRequestDto.id === requesterId) {
      throw new BadRequestException("Same id")
    }

    const isSameRole = await this.checkService.isSameRole(connectionRequestDto.id, requesterId);
    if (isSameRole) {
      throw new BadRequestException("Same role")
    }
    const { userId, coachId } = this.getService.getUserAndCoachId(connectionRequestDto.id, requesterId, requesterRole);

    const isUserBlocked = await this.userCheckService.isUserBlocked(connectionRequestDto.id)
    if (isUserBlocked) {
      throw new ForbiddenException("Other user is banned")
    }

    const isConnectionExist = await this.connectionCheckService.checkExistingConnection(userId, coachId);
    if (isConnectionExist) {
      throw new BadRequestException("Existing connection");
    }

    const isConnectionRequestExist = await this.checkService.checkExistingConnectionRequest(userId, coachId);
    if (isConnectionRequestExist) {
      throw new BadRequestException("Existing connection request");
    }
    if (connectionRequestDto.accessAll) {
      const isAccessAllConnectionExit = await this.connectionCheckService.checkExistingAccessAllConnection(userId)
      if (isAccessAllConnectionExit) {
        throw new ForbiddenException("User already has a main coach")
      }
    }

    Logger.debug(`Creating connection request userId: ${userId} coachId: ${coachId}`)
    const createInput = this.getService.getConnectionRequestCreateInput(userId, requesterId, coachId, connectionRequestDto.accessAll);
    return this.createService.createConnectionRequest(createInput);
  }
}

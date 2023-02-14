import { Controller, Get } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getUser() {}
}

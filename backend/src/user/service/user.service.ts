import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../utils/prirsma.service';
import { CreateUserDTO } from '../dto/createUserDTO';
import { Prisma } from '@prisma/client';
import { Roles } from '../utils/roles';
import { compareData, encryptData } from '../../utils/bcrypt';
import { UpdateUserDTO } from '../dto/updateUserDTO';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async getUsers() {
    const users = await this.prismaService.users.findMany();
    console.log(users);
    return users;
  }
  async getUserByEmail(email: string) {
    const users = await this.prismaService.users.findUnique({
      where: {
        email,
      },
      include: {
        roles: true,
      },
    });
    return users;
  }
  async getUserById(userId: number) {
    const users = await this.prismaService.users.findUnique({
      where: {
        userId,
      },
      include: {
        roles: true,
      },
    });
    return users;
  }

  /*async createUsersWithRoles() {
    const users = await this.prismaService.users.createMany({
      data: [
        { email: 'csanademail@gmail.com', password: 'myPassword', roleId: 3 },
        {
          email: 'NimrodEmail@asd.hu',
          password: 'mySecondPassword',
          roleId: 3,
        },
      ],
    });
  }*/
  getRoleId(isCoach: boolean): number {
    return isCoach ? Roles.COACH.roleId : Roles.USER.roleId;
  }
  getUsersCreateInput(user: CreateUserDTO): Prisma.usersCreateInput {
    const roleId = this.getRoleId(user.isCoach);
    return {
      email: user.email,
      password: encryptData(user.password),
      refreshToken: encryptData(user.refreshToken),
      roles: {
        connect: {
          roleId,
        },
      },
    };
  }
  /*
  async getUsersUpdateInput(
    userDTO: UpdateUserDTO,
    userId: number,
  ): Promise<Prisma.usersUpdateInput> {
    const user = await this.getUserById(userId);

    const userUpdateInput: Prisma.usersUpdateInput = {
      email: user.email,
      password: user.password,
    };
    if (userDTO.password) {
      if (!compareData(userDTO.password, user.password)) {
        userUpdateInput.password = encryptData(userDTO.password);
        return userUpdateInput;
      }
    }
    return userUpdateInput;
  }
  */
  async checkEmail(email: string, userId: number) {
    const user = await this.getUserById(userId);
    return email === user.email;
  }
  async checkPassword(password: string, userId: number) {
    const user = await this.getUserById(userId);
    return compareData(password, user.password);
  }
  async checkRefreshToken(refreshToken: string, userId: number) {
    const user = await this.getUserById(userId);
    return compareData(refreshToken, user.refreshToken);
  }
  createUser(user: Prisma.usersCreateInput) {
    return this.prismaService.users.create({
      data: user,
    });
  }
  async updateEmail(email: string, userId: number) {
    if (await this.checkEmail(email, userId)) {
      throw new ConflictException('Cannot be the same email');
    }
    return this.prismaService.users.update({
      data: { email },
      where: { userId },
    });
  }
  async updatePassword(password: string, userId: number) {
    if (await this.checkPassword(password, userId)) {
      throw new ConflictException('Cannot be the same password');
    }
    password = encryptData(password);
    return this.prismaService.users.update({
      data: { password },
      where: { userId },
    });
  }
  async updateRefreshToken(refreshToken: string, userId: number) {
    if (await this.checkRefreshToken(refreshToken, userId)) {
      throw new ConflictException('Cannot be the same refreshToken');
    }
    refreshToken = encryptData(refreshToken);
    return this.prismaService.users.update({
      data: { refreshToken },
      where: { userId },
    });
  }
}

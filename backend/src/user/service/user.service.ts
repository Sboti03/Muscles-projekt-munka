import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../utils/prirsma.service';
import { CreateUserDTO } from '../dto/createUserDTO';
import { Prisma } from '@prisma/client';
import { Roles } from '../utils/roles';
import {compareData, encryptData} from '../../utils/bcrypt';
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
      roles: {
        connect: {
          roleId,
        },
      },
    };
  }
  async getUsersUpdateInput(
    userDTO: UpdateUserDTO,
    userId: number,
  ): Promise<Prisma.usersUpdateInput> {
    const user = await this.getUserById(userId);

    const userUpdateInput: Prisma.usersUpdateInput = {
      email: user.email,
      password: user.password,
    };
    if (userDTO.email) {
      if (userDTO.email !== user.email) {
        userUpdateInput.email = userDTO.email;
        return userUpdateInput;
      }
    }
    if (userDTO.password) {
      if (!compareData(userDTO.password, user.password)) {
        userUpdateInput.password = encryptData(userDTO.password);
        return userUpdateInput;
      }
    }
    return userUpdateInput;
  }
}

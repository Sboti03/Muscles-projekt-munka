import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../utils/prirsma.service';
import { CreateUserDTO } from '../dto/createUserDTO';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async getUsers() {
    const users = await this.prismaService.users.findMany();
    console.log(users);
    return users;
  }
  async getUser() {
    const users = await this.prismaService.users.findUnique({
      where: {
        email: 'Csanademail@gmail.com',
      },
    });
    console.log(users);
    return users;
  }

  async createUsersWithRoles() {
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
  }
  getUsersCreateInput(user: CreateUserDTO): string {
    return 'Email: ' + user.email + ' Password: ' + user.password;
  }
}

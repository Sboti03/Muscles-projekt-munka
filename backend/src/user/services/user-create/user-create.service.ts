import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../Common/utils/prirsma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserCreateService {
  constructor(private prismaService: PrismaService) {}

  createUser(user: Prisma.usersCreateInput) {
    return this.prismaService.users.create({
      data: user,
      include: {
        role: true
      }
    });
  }

  async createProfileData(userId: number) {
    return this.prismaService.profileData.create({
        data: {
            user: {
              connect: {
                userId
              }
            },
          profileId: userId,
          goal: {
            create: [{}]
          },
        },
    })

  }
}

import { BadRequestException, INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

  constructor() {
    super({ log: [{ emit: "event", level: "query" }] });

    this.$use(async(param, next) => {
      if(param.model == 'dayHistory' && param.action == 'create') {
        const count = await this.dayHistory.count({
          where: {
                profileId: param.args.data.profileData.connect.profileId,
                date: param.args.data.date
              }
          });
        if(count > 0) {
          throw new BadRequestException('Duplication')
        }
      }
      return next(param)
    })
  }


  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
        log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    console.log('Connecting to database...');
    await this.$connect();
  }

  async enableShutdownHooks() {
    this.$on('beforeExit' as any as never, async () => {
      await this.$disconnect();
    });
  }
}

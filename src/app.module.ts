import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { LinkModule } from './link/link.module';


@Module({
  imports: [AuthModule, LinkModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

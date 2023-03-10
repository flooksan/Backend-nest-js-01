import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // import prismamodule for use prisma service
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

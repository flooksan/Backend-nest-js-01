import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // ทำให้ prisma module เป็น global module จะได้ไม่ต้องไป imports ที่ module แต่ละตัวแบบ auth module
@Module({
  providers: [PrismaService], // ตัวที่ให้บริการคือ prisma service ให้บริการในตัว module นี้
  exports: [PrismaService] // export prisma service เพื่อให้เอาไปใช้ที่ auth module กับ auth service ได้
})
export class PrismaModule {}

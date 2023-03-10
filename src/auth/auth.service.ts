import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {} // init prisma from prisma service

  signup() {
    return { msg: 'Sign up gogogo!!' };
  }

  signin() {
    return { msg: 'Sign in NoNoNo!!' };
  }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService, // call JWT Service
    private config: ConfigService, // call config for use .env
  ) {} // init prisma from prisma service

  async signup(dto: AuthDto) {
    try {
      const { email, password } = dto;

      // Generate hash password
      const hash = await argon2.hash(password);
      // Create new user and save to db
      const user = await this.prisma.user.create({
        data: {
          email,
          hash,
        },
        // select: {
        //   id: true // เป็นการบอกให้ prisma เลือกมาโชว์เฉพาะ ID
        // }
      });
      // console.log(hash, user);

      // delete user.hash; // will delete user hash before return user
      return this.signToken(user.id, user.email);
    } catch (error) {
      console.log(error);
      if (error.code === 'P2002') {
        throw new ForbiddenException('Credentials taken');
      }
      // if (error instanceof PrismaClientKnownRequestError) {
      //   console.log('eeeeerror')

      // }
    }
  }

  async signin(dto: AuthDto) {
    const { email, password: hash } = dto;
    try {
      // Find user by email
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      //Guard condition if !email
      if (!user) {
        return "Can't found user!";
      }

      // Compare password
      const compare = await argon2.verify(user.hash, hash);
      //Guard condition if !compare
      if (!compare) {
        return 'Password incorrect!';
      }

      // Send back user without return hash password
      // delete user.hash;
      return this.signToken(user.id, user.email);
    } catch (error) {
      console.log(error);
    }
  }

  async signToken(userId: number, email: string): Promise<{access_token: string}> {
    const payload = {
      id: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
    
    return {
      access_token : token,
    };

  }
}

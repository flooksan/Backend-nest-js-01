import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-guard') {
  // jwt-guard use for AuthGuards
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // token from login will use to authen to access service website
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    // console.log({ payload, });
    const user = await this.prisma.user.findUnique({
      where: { id: payload.id },
      // select: { // ใช้ select ก็ได้ถ้าอยากให้ออกมาแค่บางตัวแต่เราแค่ไม่อยากให้ hash password ออกมาเขียนแบบด้านล่าง
      //   email: true,
      //   id: true,
      // }
    })
    delete user.hash // delete hash password before send res.
    return user;
  }
}

/* payload ที่ส่งมา userId, email ที่เป็น token
  {
  payload: {
    id: 3,
    email: 'kloof_open109@dev.com',      
    iat: 1678763863,
    exp: 1678764763
    }
  }
*/
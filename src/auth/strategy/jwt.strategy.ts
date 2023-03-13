import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-guard') {
  // jwt-guard use for AuthGuards
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // token from login will use to authen to access service website
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return payload;
  }
}

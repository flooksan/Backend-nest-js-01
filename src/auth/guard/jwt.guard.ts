import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt-guard') {
  constructor() {
    super();
  }
}

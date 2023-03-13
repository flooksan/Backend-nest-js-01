import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {

  @UseGuards(AuthGuard('jwt-guard')) // Call UseGuards for check Authorize user are login or not
  @Get('me')
  getMe() {
    return 'Hello Kloof';
  }
}

import { Controller, Get, Post, Req, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    // We don't use {@Req() req: Request} but use params or body with DTO (dto is something validate req/params is match dto)
    // console.log(req.body) // log show request object ส่วนใหญ่เราใช้ req.body
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @Get('test')
  test() {
    return process.env.DATABASE_URL;
  }
}

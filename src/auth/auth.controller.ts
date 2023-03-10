import { Controller, Get, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor( private readonly authService : AuthService) { }
    
    @Post('signup')
    signup(@Req() req: Request) {
        console.log(req.body) // log show request object ส่วนใหญ่เราใช้ req.body
        return this.authService.signup;
    }

    @Post('signin')
    signin() {
        return this.authService.signin;
    }
}
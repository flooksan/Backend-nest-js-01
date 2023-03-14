import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { UserReq } from 'src/auth/custom_decorator';
import { JwtGuard } from 'src/auth/guard';


@Controller('users')
export class UserController {
    //  api users/me old for improve we create custom user-decorator 
    // @UseGuards(AuthGuard('jwt-guard')) // Call UseGuards for check Authorize user are login or not
    // @UseGuards(JwtGuard) // เขียนอีกแบบโดยไปสร้างobject การ์ดไว้แล้ว import ออกมา เรียก custom guard
    // @Get('me')
    // getMe(@Req() req: Request) {
    //   // req รับบางอย่างมาจาก jwt.strategy ที่เราเอา token authen ผ่าน
    //   console.log({
    //     user: req.user, // express know when we authen user will possible show user object
    //   })
    //   return req.user;
    // }

    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@UserReq() user: User) { // user type User >> type User create automate when we create schema prisma generate
      console.log(user)
      return user;
    }

    @UseGuards(JwtGuard)
    @Get('custom_decorator_id')
    getMe2(@UserReq('id') userId: number) { // we only request by id for find user type of id is strinf or number
      console.log(userId)
      return userId;
    }


    // @UseGuards(JwtGuard)
    // @Patch()
}

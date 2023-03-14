import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserReq = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    // data = input in decorator like UserReq('id') คือ request id 
    const request = ctx.switchToHttp().getRequest();
    if (data) {
      const response = request.user[data];
      console.log(`User request ${data}`)
      return response
    }
    return request.user;
  },
);

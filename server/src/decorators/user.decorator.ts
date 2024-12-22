import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IReqUser } from '../modules/auth/interfaces/req-user.interface';

export const User = createParamDecorator(
  (data: keyof IReqUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as IReqUser;

    return data ? user?.[data] : user;
  },
);

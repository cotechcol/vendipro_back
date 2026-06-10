import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRole } from '../enums';

export interface JwtPayload {
  sub: number;
  email: string;
  role: UserRole;
  storeId: number | null;
}

export const CurrentUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    return data ? user?.[data] : user;
  },
);

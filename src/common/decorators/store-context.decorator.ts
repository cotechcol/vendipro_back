import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { StoreContext } from '../utils/store-context.util';

export const StoreCtx = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): StoreContext => {
    const request = ctx.switchToHttp().getRequest();
    return request.storeContext as StoreContext;
  },
);

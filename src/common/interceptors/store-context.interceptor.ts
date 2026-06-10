import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { resolveStoreContext } from '../utils/store-context.util';
import type { JwtPayload } from '../decorators/current-user.decorator';

@Injectable()
export class StoreContextInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    if (request.user) {
      const headerStoreId = request.headers['x-store-id'] as string | undefined;
      request.storeContext = resolveStoreContext(
        request.user as JwtPayload,
        headerStoreId,
      );
    }
    return next.handle();
  }
}

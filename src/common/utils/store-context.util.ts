import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { UserRole } from '../enums';
import type { JwtPayload } from '../decorators/current-user.decorator';

export interface StoreContext {
  userStoreId: number | null;
  activeStoreId: number | null;
  isSuperAdmin: boolean;
  allStores: boolean;
}

export function resolveStoreContext(
  user: JwtPayload,
  headerStoreId?: string,
): StoreContext {
  const isSuperAdmin = user.role === UserRole.SUPER_ADMIN;

  if (isSuperAdmin) {
    const parsed = headerStoreId ? parseInt(headerStoreId, 10) : NaN;
    const activeStoreId = !isNaN(parsed) && parsed > 0 ? parsed : null;
    return {
      userStoreId: null,
      activeStoreId,
      isSuperAdmin: true,
      allStores: activeStoreId === null,
    };
  }

  if (!user.storeId) {
    throw new ForbiddenException('Usuario sin tienda asignada');
  }

  return {
    userStoreId: user.storeId,
    activeStoreId: user.storeId,
    isSuperAdmin: false,
    allStores: false,
  };
}

/** Requiere tienda activa (operaciones transaccionales) */
export function requireStoreId(ctx: StoreContext): number {
  if (ctx.activeStoreId) return ctx.activeStoreId;
  throw new BadRequestException(
    'Selecciona una tienda activa (header X-Store-Id) para esta operación',
  );
}

/** Filtro opcional para reportes (super admin sin tienda = todas) */
export function reportStoreId(ctx: StoreContext): number | undefined {
  if (ctx.allStores) return undefined;
  return requireStoreId(ctx);
}

/** Filtro where para listados */
export function storeWhere(ctx: StoreContext): { storeId?: number } | Record<string, never> {
  if (ctx.allStores) return {};
  if (ctx.activeStoreId) return { storeId: ctx.activeStoreId };
  return {};
}

import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { AdjustInventoryDto } from './dto/inventory.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { StoreCtx } from '../common/decorators/store-context.decorator';
import type { StoreContext } from '../common/utils/store-context.util';

@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InventoryController {
  constructor(private service: InventoryService) {}

  @Get('movements')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  getMovements(@Query() query: PaginationDto & { productId?: number }, @StoreCtx() ctx: StoreContext) {
    return this.service.getMovements(query, ctx);
  }

  @Get('production-preview')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  productionPreview(
    @Query('productId') productId: string,
    @Query('quantity') quantity: string,
    @StoreCtx() ctx: StoreContext,
  ) {
    return this.service.productionPreview(Number(productId), Number(quantity), ctx);
  }

  @Post('adjust')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  adjust(
    @Body() dto: AdjustInventoryDto,
    @CurrentUser('sub') userId: number,
    @StoreCtx() ctx: StoreContext,
  ) {
    return this.service.adjust(dto, userId, ctx);
  }
}

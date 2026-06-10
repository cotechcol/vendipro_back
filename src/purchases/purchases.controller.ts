import {
  Controller, Get, Post, Body, Param, Query, UseGuards, ParseIntPipe,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/purchase.dto';
import { PurchaseQueryDto } from './dto/purchase-query.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { StoreCtx } from '../common/decorators/store-context.decorator';
import type { StoreContext } from '../common/utils/store-context.util';

@Controller('purchases')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
export class PurchasesController {
  constructor(private service: PurchasesService) {}

  @Get()
  findAll(@Query() query: PurchaseQueryDto, @StoreCtx() ctx: StoreContext) {
    return this.service.findAll(query, ctx);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @StoreCtx() ctx: StoreContext) {
    return this.service.findOne(id, ctx);
  }

  @Post()
  create(
    @Body() dto: CreatePurchaseDto,
    @CurrentUser('sub') userId: number,
    @StoreCtx() ctx: StoreContext,
  ) {
    return this.service.create(dto, userId, ctx);
  }
}

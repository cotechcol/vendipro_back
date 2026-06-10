import {
  Controller, Get, Post, Body, Param, Query, UseGuards, ParseIntPipe,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/sale.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { StoreCtx } from '../common/decorators/store-context.decorator';
import type { StoreContext } from '../common/utils/store-context.util';

@Controller('sales')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CASHIER)
export class SalesController {
  constructor(private service: SalesService) {}

  @Get()
  findAll(@Query() query: PaginationDto & { from?: string; to?: string }, @StoreCtx() ctx: StoreContext) {
    return this.service.findAll(query, ctx);
  }

  @Get(':id/ticket')
  getTicket(@Param('id', ParseIntPipe) id: number, @StoreCtx() ctx: StoreContext) {
    return this.service.getTicket(id, ctx);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @StoreCtx() ctx: StoreContext) {
    return this.service.findOne(id, ctx);
  }

  @Post()
  create(
    @Body() dto: CreateSaleDto,
    @CurrentUser('sub') userId: number,
    @StoreCtx() ctx: StoreContext,
  ) {
    return this.service.create(dto, userId, ctx);
  }
}

import {
  Controller, Get, Post, Body, Param, Query, UseGuards, ParseIntPipe,
} from '@nestjs/common';
import { CashSessionsService } from './cash-sessions.service';
import { OpenCashSessionDto, CloseCashSessionDto } from './dto/cash-session.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { JwtPayload } from '../common/decorators/current-user.decorator';
import { StoreCtx } from '../common/decorators/store-context.decorator';
import type { StoreContext } from '../common/utils/store-context.util';

@Controller('cash-sessions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CASHIER)
export class CashSessionsController {
  constructor(private service: CashSessionsService) {}

  @Get('current')
  getCurrent(
    @CurrentUser() user: JwtPayload,
    @StoreCtx() ctx: StoreContext,
  ) {
    return this.service.getCurrent(user.sub, ctx, user.role);
  }

  @Post('open')
  open(
    @Body() dto: OpenCashSessionDto,
    @CurrentUser() user: JwtPayload,
    @StoreCtx() ctx: StoreContext,
  ) {
    return this.service.open(dto, user.sub, user.role, ctx);
  }

  @Post(':id/close')
  close(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CloseCashSessionDto,
    @CurrentUser() user: JwtPayload,
    @StoreCtx() ctx: StoreContext,
  ) {
    return this.service.close(id, dto, user.sub, user.role, ctx);
  }

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  findAll(@Query() query: PaginationDto, @CurrentUser() user: JwtPayload, @StoreCtx() ctx: StoreContext) {
    return this.service.findAll(query, user.sub, user.role, ctx);
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtPayload,
    @StoreCtx() ctx: StoreContext,
  ) {
    return this.service.findOne(id, user.sub, user.role, ctx);
  }
}

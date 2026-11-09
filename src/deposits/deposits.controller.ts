import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { DepositsService } from './deposits.service';
import { ReturnDepositDto } from './dto/deposit.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { StoreCtx } from '../common/decorators/store-context.decorator';
import type { StoreContext } from '../common/utils/store-context.util';

@Controller('deposits')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CASHIER)
export class DepositsController {
  constructor(private service: DepositsService) {}

  @Get('lookup')
  lookup(@Query('code') code: string, @StoreCtx() ctx: StoreContext) {
    return this.service.lookup(code ?? '', ctx);
  }

  @Post(':code/return')
  refund(
    @Param('code') code: string,
    @Body() dto: ReturnDepositDto,
    @CurrentUser('sub') userId: number,
    @StoreCtx() ctx: StoreContext,
  ) {
    return this.service.refund(code, dto.quantity, userId, ctx);
  }
}

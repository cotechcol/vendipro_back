import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums';
import { StoreCtx } from '../common/decorators/store-context.decorator';
import type { StoreContext } from '../common/utils/store-context.util';
import { todayColombia } from '../common/utils/date.util';

@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportsController {
  constructor(private service: ReportsService) {}

  @Get('dashboard')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CASHIER)
  getDashboard(@StoreCtx() ctx: StoreContext) {
    return this.service.getDashboard(ctx);
  }

  @Get('sales')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CASHIER)
  getSalesReport(
    @Query('from') from: string,
    @Query('to') to: string,
    @StoreCtx() ctx: StoreContext,
  ) {
    const today = todayColombia();
    return this.service.getSalesReport(from || today, to || today, ctx);
  }

  @Get('inventory')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  getInventoryReport(@StoreCtx() ctx: StoreContext) {
    return this.service.getInventoryReport(ctx);
  }

  @Get('profitability')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  getProfitabilityReport(
    @Query('from') from: string,
    @Query('to') to: string,
    @StoreCtx() ctx: StoreContext,
  ) {
    const today = todayColombia();
    return this.service.getProfitabilityReport(from || today, to || today, ctx);
  }

  @Get('products')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CASHIER)
  getProductsReport(
    @Query('from') from: string,
    @Query('to') to: string,
    @StoreCtx() ctx: StoreContext,
  ) {
    const today = todayColombia();
    return this.service.getProductsReport(from || today, to || today, ctx);
  }

  @Get('daily-sales')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CASHIER)
  getDailySales(
    @Query('from') from: string,
    @Query('to') to: string,
    @StoreCtx() ctx: StoreContext,
  ) {
    const today = todayColombia();
    return this.service.getDailySales(from || today, to || today, ctx);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { StoreCtx } from '../common/decorators/store-context.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserRole } from '../common/enums';
import type { StoreContext } from '../common/utils/store-context.util';
import {
  AddTableOrderItemDto,
  CloseTableOrderDto,
  CreateTableDto,
  OpenTableOrderDto,
  UpdateTableDto,
  UpdateTableOrderItemDto,
} from './dto/table.dto';
import { TablesService } from './tables.service';

@Controller('tables')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CASHIER)
export class TablesController {
  constructor(private service: TablesService) {}

  @Get()
  list(@StoreCtx() ctx: StoreContext) {
    return this.service.list(ctx);
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  create(@Body() dto: CreateTableDto, @StoreCtx() ctx: StoreContext) {
    return this.service.create(dto, ctx);
  }

  @Patch(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTableDto,
    @StoreCtx() ctx: StoreContext,
  ) {
    return this.service.update(id, dto, ctx);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number, @StoreCtx() ctx: StoreContext) {
    return this.service.remove(id, ctx);
  }

  @Post(':id/open')
  open(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: OpenTableOrderDto,
    @CurrentUser('sub') userId: number,
    @StoreCtx() ctx: StoreContext,
  ) {
    return this.service.open(id, dto, userId, ctx);
  }

  @Get('orders/:orderId')
  getOrder(@Param('orderId', ParseIntPipe) orderId: number, @StoreCtx() ctx: StoreContext) {
    return this.service.getOrder(orderId, ctx);
  }

  @Post('orders/:orderId/items')
  addItem(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() dto: AddTableOrderItemDto,
    @StoreCtx() ctx: StoreContext,
  ) {
    return this.service.addItem(orderId, dto, ctx);
  }

  @Patch('orders/:orderId/items/:itemId')
  updateItem(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() dto: UpdateTableOrderItemDto,
    @StoreCtx() ctx: StoreContext,
  ) {
    return this.service.updateItem(orderId, itemId, dto, ctx);
  }

  @Delete('orders/:orderId/items/:itemId')
  removeItem(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
    @StoreCtx() ctx: StoreContext,
  ) {
    return this.service.removeItem(orderId, itemId, ctx);
  }

  @Post('orders/:orderId/release')
  releaseEmptyOrder(
    @Param('orderId', ParseIntPipe) orderId: number,
    @CurrentUser('sub') userId: number,
    @StoreCtx() ctx: StoreContext,
  ) {
    return this.service.releaseEmptyOrder(orderId, userId, ctx);
  }

  @Post('orders/:orderId/close')
  closeOrder(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() dto: CloseTableOrderDto,
    @CurrentUser('sub') userId: number,
    @StoreCtx() ctx: StoreContext,
  ) {
    return this.service.closeOrder(orderId, dto, userId, ctx);
  }
}

import {
  Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums';
import { StoreCtx } from '../common/decorators/store-context.decorator';
import type { StoreContext } from '../common/utils/store-context.util';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CASHIER)
  findAll(@Query() query: PaginationDto & { categoryId?: number }, @StoreCtx() ctx: StoreContext) {
    return this.service.findAll(query, ctx);
  }

  @Get('pos')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CASHIER)
  findForPos(
    @Query('search') search: string | undefined,
    @Query('categoryId') categoryId: string | undefined,
    @StoreCtx() ctx: StoreContext,
  ) {
    return this.service.findForPos(search, categoryId ? +categoryId : undefined, ctx);
  }

  @Get('low-stock')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  findLowStock(@StoreCtx() ctx: StoreContext) {
    return this.service.findLowStock(ctx);
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CASHIER)
  findOne(@Param('id', ParseIntPipe) id: number, @StoreCtx() ctx: StoreContext) {
    return this.service.findOne(id, ctx);
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  create(@Body() dto: CreateProductDto, @StoreCtx() ctx: StoreContext) {
    return this.service.create(dto, ctx);
  }

  @Patch(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
    @StoreCtx() ctx: StoreContext,
  ) {
    return this.service.update(id, dto, ctx);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number, @StoreCtx() ctx: StoreContext) {
    return this.service.remove(id, ctx);
  }
}

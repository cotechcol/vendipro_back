import {
  Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseIntPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums';
import { StoreCtx } from '../common/decorators/store-context.decorator';
import type { StoreContext } from '../common/utils/store-context.util';

@Controller('categories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriesController {
  constructor(private service: CategoriesService) {}

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CASHIER)
  findAll(@Query() query: PaginationDto, @StoreCtx() ctx: StoreContext) {
    return this.service.findAll(query, ctx);
  }

  @Get('active')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CASHIER)
  findAllActive(@StoreCtx() ctx: StoreContext) {
    return this.service.findAllActive(ctx);
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CASHIER)
  findOne(@Param('id', ParseIntPipe) id: number, @StoreCtx() ctx: StoreContext) {
    return this.service.findOne(id, ctx);
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  create(@Body() dto: CreateCategoryDto, @StoreCtx() ctx: StoreContext) {
    return this.service.create(dto, ctx);
  }

  @Patch(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
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

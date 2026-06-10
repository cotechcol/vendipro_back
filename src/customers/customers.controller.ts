import {
  Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseIntPipe,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums';
import { StoreCtx } from '../common/decorators/store-context.decorator';
import type { StoreContext } from '../common/utils/store-context.util';

@Controller('customers')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CASHIER)
export class CustomersController {
  constructor(private service: CustomersService) {}

  @Get()
  findAll(@Query() query: PaginationDto, @StoreCtx() ctx: StoreContext) {
    return this.service.findAll(query, ctx);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @StoreCtx() ctx: StoreContext) {
    return this.service.findOne(id, ctx);
  }

  @Post()
  create(@Body() dto: CreateCustomerDto, @StoreCtx() ctx: StoreContext) {
    return this.service.create(dto, ctx);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCustomerDto,
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

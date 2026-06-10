import {
  Controller, Get, Post, Patch, Body, Param, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto, UpdateStoreDto } from './dto/store.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums';
import { StoreCtx } from '../common/decorators/store-context.decorator';
import type { StoreContext } from '../common/utils/store-context.util';

@Controller('stores')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StoresController {
  constructor(private service: StoresService) {}

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CASHIER)
  findAll(@StoreCtx() ctx: StoreContext) {
    return this.service.findAll(ctx);
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN)
  create(@Body() dto: CreateStoreDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles(UserRole.SUPER_ADMIN)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStoreDto) {
    return this.service.update(id, dto);
  }

  @Patch(':id/deactivate')
  @Roles(UserRole.SUPER_ADMIN)
  deactivate(@Param('id', ParseIntPipe) id: number) {
    return this.service.deactivate(id);
  }
}

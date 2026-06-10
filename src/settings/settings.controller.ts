import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingDto } from './dto/setting.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums';
import { StoreCtx } from '../common/decorators/store-context.decorator';
import type { StoreContext } from '../common/utils/store-context.util';

@Controller('settings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SettingsController {
  constructor(private service: SettingsService) {}

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CASHIER)
  get(@StoreCtx() ctx: StoreContext) {
    return this.service.getForContext(ctx);
  }

  @Patch()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  update(@Body() dto: UpdateSettingDto, @StoreCtx() ctx: StoreContext) {
    return this.service.update(dto, ctx);
  }
}

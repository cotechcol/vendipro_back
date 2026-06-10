import { Controller, Post, Query, UseGuards } from '@nestjs/common';
import { SeedService } from './seed.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums';

@Controller('seed')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class SeedController {
  constructor(private seedService: SeedService) {}

  @Post('demo')
  async seedDemo(@Query('force') force?: string) {
    await this.seedService.seedDemo(force === 'true');
    return { message: 'Datos demo cargados correctamente' };
  }
}

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/decorators/public.decorator';
import { getAppTimezone } from './common/utils/timezone.util';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('health')
  health() {
    return { ok: true, tz: getAppTimezone() };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

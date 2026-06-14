import { Controller, Get } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import { Public } from './common/decorators/public.decorator';
import { getAppTimezone } from './common/utils/timezone.util';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  @Public()
  @Get('health')
  async health() {
    let db = false;
    let users = 0;
    try {
      const rows = await this.dataSource.query('SELECT COUNT(*) as n FROM users');
      users = Number(rows[0]?.n ?? 0);
      db = true;
    } catch {
      db = false;
    }
    return { ok: db, db, users, tz: getAppTimezone() };
  }

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

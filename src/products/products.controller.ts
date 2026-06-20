import {
  Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseIntPipe,
  UploadedFile, UseInterceptors, BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums';
import { StoreCtx } from '../common/decorators/store-context.decorator';
import type { StoreContext } from '../common/utils/store-context.util';

const IMAGE_UPLOAD = {
  storage: memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (
    _req: unknown,
    file: Express.Multer.File,
    cb: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (!/^image\/(jpeg|png|webp|gif)$/.test(file.mimetype)) {
      cb(new BadRequestException('Solo imágenes JPG, PNG, WEBP o GIF') as unknown as Error, false);
      return;
    }
    cb(null, true);
  },
};

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

  @Get('bulk')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  findBulk(@StoreCtx() ctx: StoreContext) {
    return this.service.findBulkProducts(ctx);
  }

  @Get(':id/image-url')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CASHIER)
  getImageUrl(@Param('id', ParseIntPipe) id: number, @StoreCtx() ctx: StoreContext) {
    return this.service.getImageUrl(id, ctx);
  }

  @Post(':id/image')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('image', IMAGE_UPLOAD))
  uploadImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @StoreCtx() ctx: StoreContext,
  ) {
    return this.service.uploadImage(id, file, ctx);
  }

  @Delete(':id/image')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  removeImage(@Param('id', ParseIntPipe) id: number, @StoreCtx() ctx: StoreContext) {
    return this.service.removeImage(id, ctx);
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

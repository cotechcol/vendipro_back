import { Injectable, Logger, BadRequestException, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const ALLOWED_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private client: S3Client | null = null;
  private bucket = 'imagenes';
  private configured = false;

  constructor(private config: ConfigService) {
    const endpoint = config.get<string>('SUPABASE_S3_ENDPOINT');
    const accessKeyId = config.get<string>('SUPABASE_S3_ACCESS_KEY_ID');
    const secretAccessKey = config.get<string>('SUPABASE_S3_SECRET_ACCESS_KEY');
    this.bucket = config.get<string>('SUPABASE_STORAGE_BUCKET') ?? 'imagenes';

    if (endpoint && accessKeyId && secretAccessKey) {
      this.client = new S3Client({
        forcePathStyle: true,
        region: config.get<string>('SUPABASE_S3_REGION') ?? 'us-east-1',
        endpoint,
        credentials: { accessKeyId, secretAccessKey },
      });
      this.configured = true;
    } else {
      this.logger.warn('Supabase S3 no configurado — las imágenes de producto estarán deshabilitadas');
    }
  }

  isConfigured(): boolean {
    return this.configured;
  }

  assertConfigured(): void {
    if (!this.client) {
      throw new ServiceUnavailableException(
        'Almacenamiento de imágenes no configurado. Revisa SUPABASE_S3_* en .env',
      );
    }
  }

  validateImageFile(file: Express.Multer.File): string {
    const ext = ALLOWED_MIME[file.mimetype];
    if (!ext) {
      throw new BadRequestException('Solo se permiten imágenes JPG, PNG, WEBP o GIF');
    }
    return ext;
  }

  buildProductImageKey(storeId: number, productId: number, ext: string): string {
    return `products/${storeId}/${productId}.${ext}`;
  }

  async uploadProductImage(
    storeId: number,
    productId: number,
    file: Express.Multer.File,
  ): Promise<string> {
    this.assertConfigured();
    const ext = this.validateImageFile(file);
    const key = this.buildProductImageKey(storeId, productId, ext);

    await this.client!.send(new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      CacheControl: 'public, max-age=31536000',
    }));

    return key;
  }

  async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
    this.assertConfigured();
    return getSignedUrl(
      this.client!,
      new GetObjectCommand({ Bucket: this.bucket, Key: key }),
      { expiresIn },
    );
  }

  async deleteObject(key: string): Promise<void> {
    if (!this.client || !key) return;
    try {
      await this.client.send(new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }));
    } catch (err) {
      this.logger.warn(`No se pudo eliminar ${key}: ${err}`);
    }
  }
}

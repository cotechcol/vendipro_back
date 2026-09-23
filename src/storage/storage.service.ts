import {
  Injectable,
  Logger,
  BadRequestException,
  ServiceUnavailableException,
} from '@nestjs/common';
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
  /** Base pública: https://xxx.storage.supabase.co/storage/v1/object/public/imagenes */
  private publicBaseUrl: string | null = null;

  constructor(private config: ConfigService) {
    const endpoint = config.get<string>('SUPABASE_S3_ENDPOINT')?.trim();
    const accessKeyId = config.get<string>('SUPABASE_S3_ACCESS_KEY_ID')?.trim();
    const secretAccessKey = config.get<string>('SUPABASE_S3_SECRET_ACCESS_KEY')?.trim();
    const region = config.get<string>('SUPABASE_S3_REGION')?.trim() ?? 'us-east-1';
    this.bucket = config.get<string>('SUPABASE_STORAGE_BUCKET')?.trim() ?? 'imagenes';

    const explicitPublic = config.get<string>('SUPABASE_PUBLIC_URL')?.trim();
    if (explicitPublic) {
      this.publicBaseUrl = explicitPublic.replace(/\/$/, '');
    }
    // Si no hay SUPABASE_PUBLIC_URL, se usan URLs firmadas (bucket privado OK)

    if (endpoint && accessKeyId && secretAccessKey) {
      this.client = new S3Client({
        forcePathStyle: true,
        region,
        endpoint,
        credentials: { accessKeyId, secretAccessKey },
        requestChecksumCalculation: 'WHEN_REQUIRED',
        responseChecksumValidation: 'WHEN_REQUIRED',
      });
      this.configured = true;
      this.logger.log(
        `Storage S3 listo (bucket: ${this.bucket}, region: ${region}`
        + (this.publicBaseUrl ? ', URL pública activa' : '')
        + ')',
      );
    } else {
      this.logger.warn('Supabase S3 no configurado — revisa SUPABASE_S3_* en .env / Vercel');
    }
  }

  isConfigured(): boolean {
    return this.configured;
  }

  assertConfigured(): void {
    if (!this.client) {
      throw new ServiceUnavailableException(
        'Almacenamiento S3 no configurado. Agrega SUPABASE_S3_* en Vercel o .env',
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

  private async readS3Error(err: unknown): Promise<string> {
    const e = err as {
      message?: string;
      name?: string;
      $response?: { body?: { transformToString?: () => Promise<string> } };
    };
    try {
      const body = await e.$response?.body?.transformToString?.();
      if (body?.trim()) return body.trim();
    } catch { /* ignore */ }
    return e.message ?? 'Error desconocido de S3';
  }

  async uploadProductImage(
    storeId: number,
    productId: number,
    file: Express.Multer.File,
  ): Promise<string> {
    this.assertConfigured();
    const ext = this.validateImageFile(file);
    const key = this.buildProductImageKey(storeId, productId, ext);

    try {
      await this.client!.send(new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        CacheControl: 'public, max-age=31536000',
      }));
    } catch (err) {
      const detail = await this.readS3Error(err);
      this.logger.error(`Upload falló (${key}): ${detail}`);
      throw new ServiceUnavailableException(
        `No se pudo subir la imagen a Supabase: ${detail}. `
        + 'Verifica en Supabase → Storage → S3 que endpoint, región y claves coincidan.',
      );
    }

    return key;
  }

  /** URL pública instantánea (bucket público). Null si no hay base configurada. */
  getPublicUrl(key: string): string | null {
    if (!key || !this.publicBaseUrl) return null;
    return `${this.publicBaseUrl}/${key.replace(/^\//, '')}`;
  }

  /**
   * URL para mostrar en catálogo/POS.
   * Prefiere pública (sin firmar) para listados rápidos; si no, firma S3.
   */
  async getObjectUrl(key: string, expiresIn = 3600 * 12): Promise<string> {
    const publicUrl = this.getPublicUrl(key);
    if (publicUrl) return publicUrl;
    return this.getSignedUrl(key, expiresIn);
  }

  async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
    this.assertConfigured();
    try {
      return await getSignedUrl(
        this.client!,
        new GetObjectCommand({ Bucket: this.bucket, Key: key }),
        { expiresIn },
      );
    } catch (err) {
      const detail = await this.readS3Error(err);
      this.logger.error(`Signed URL falló (${key}): ${detail}`);
      throw new ServiceUnavailableException('No se pudo generar la URL de la imagen');
    }
  }

  async deleteObject(key: string): Promise<void> {
    if (!this.client || !key) return;
    try {
      await this.client.send(new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }));
    } catch (err) {
      const detail = await this.readS3Error(err);
      this.logger.warn(`No se pudo eliminar ${key}: ${detail}`);
    }
  }
}

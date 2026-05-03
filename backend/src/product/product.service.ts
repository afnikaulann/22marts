import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private supabase: SupabaseService,
  ) {}

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  async findAll(categoryId?: string) {
    return this.prisma.product.findMany({
      where: categoryId ? { categoryId } : undefined,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBestSellers(limit: number = 12) {
    const orderItems = await this.prisma.orderItem.findMany({
      where: {
        order: {
          status: {
            in: ['SELESAI', 'DIKIRIM', 'DIPROSES'],
          },
        },
      },
      select: {
        productId: true,
        quantity: true,
      },
    });

    const salesMap = new Map<string, number>();
    for (const item of orderItems) {
      salesMap.set(item.productId, (salesMap.get(item.productId) || 0) + item.quantity);
    }

    const sortedProductIds = Array.from(salesMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map((entry) => entry[0]);

    if (sortedProductIds.length === 0) {
      // Fallback jika belum ada pesanan sama sekali
      return this.prisma.product.findMany({
        where: { isActive: true },
        include: { category: true },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });
    }

    const products = await this.prisma.product.findMany({
      where: {
        id: { in: sortedProductIds },
        isActive: true,
      },
      include: { category: true },
    });

    // Mengembalikan sesuai urutan penjualan tertinggi
    return sortedProductIds
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean);
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      throw new NotFoundException('Produk tidak ditemukan');
    }

    return product;
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findFirst({
      where: { slug },
      include: { category: true },
    });

    if (!product) {
      throw new NotFoundException('Produk tidak ditemukan');
    }

    return product;
  }

  async create(dto: CreateProductDto, file?: Express.Multer.File) {
    const slug = this.generateSlug(dto.name);
    let thumbnail: string | null = null;

    if (file) {
      const fileName = `${slug}-${Date.now()}.${file.originalname.split('.').pop()}`;
      thumbnail = await this.supabase.uploadFile(
        'thumbnails',
        fileName,
        file.buffer,
        file.mimetype,
      );
    }

    return this.prisma.product.create({
      data: {
        name: dto.name,
        slug,
        description: dto.description,
        price: dto.price,
        stock: dto.stock ?? 0,
        thumbnail,
        categoryId: dto.categoryId,
        isActive: dto.isActive ?? true,
      },
      include: { category: true },
    });
  }

  async update(id: string, dto: UpdateProductDto, file?: Express.Multer.File) {
    const product = await this.findOne(id);

    const data: any = { ...dto };
    if (dto.name) {
      data.slug = this.generateSlug(dto.name);
    }

    if (file) {
      // Delete old thumbnail if exists
      if (product.thumbnail) {
        const oldPath = product.thumbnail.split('/').pop();
        if (oldPath) {
          await this.supabase.deleteFile('thumbnails', oldPath);
        }
      }

      const fileName = `${data.slug || product.slug}-${Date.now()}.${file.originalname.split('.').pop()}`;
      data.thumbnail = await this.supabase.uploadFile(
        'thumbnails',
        fileName,
        file.buffer,
        file.mimetype,
      );
    }

    return this.prisma.product.update({
      where: { id },
      data,
      include: { category: true },
    });
  }

  async remove(id: string) {
    const product = await this.findOne(id);

    // Delete thumbnail if exists
    if (product.thumbnail) {
      const path = product.thumbnail.split('/').pop();
      if (path) {
        await this.supabase.deleteFile('thumbnails', path);
      }
    }

    return this.prisma.product.delete({
      where: { id },
    });
  }
}

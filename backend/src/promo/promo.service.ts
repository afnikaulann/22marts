import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PromoService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.promo.findMany({
      include: { 
        categories: true,
        products: { select: { id: true, name: true } }
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const promo = await this.prisma.promo.findUnique({ 
      where: { id },
      include: { 
        categories: true,
        products: { select: { id: true, name: true } }
      }
    });
    if (!promo) throw new NotFoundException('Promo tidak ditemukan');
    return promo;
  }

  async create(data: {
    code: string;
    description?: string;
    discountType: 'PERCENTAGE' | 'FIXED';
    discountValue: number;
    minPurchase?: number;
    maxDiscount?: number;
    usageLimit?: number;
    perUserLimit?: number;
    startDate: string;
    endDate: string;
    isActive?: boolean;
    categoryIds?: string[];
    productIds?: string[];
  }) {
    const { categoryIds, productIds, ...rest } = data;
    const existing = await this.prisma.promo.findUnique({
      where: { code: data.code.toUpperCase() },
    });
    if (existing) throw new BadRequestException('Kode promo sudah digunakan');

    try {
      const createData: any = {
        code: data.code.toUpperCase(),
        description: data.description,
        discountType: data.discountType,
        discountValue: data.discountValue,
        minPurchase: data.minPurchase || 0,
        maxDiscount: data.maxDiscount,
        usageLimit: data.usageLimit,
        perUserLimit: data.perUserLimit || 0,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        isActive: data.isActive ?? true,
      };

      if (categoryIds) {
        createData.categories = {
          connect: categoryIds.map(id => ({ id }))
        };
      }

      if (productIds) {
        createData.products = {
          connect: productIds.map(id => ({ id }))
        };
      }

      return await this.prisma.promo.create({
        data: createData,
        include: { categories: true, products: true }
      });
    } catch (error) {
      console.error('Create Promo Error:', error);
      throw new BadRequestException('Gagal membuat promo: ' + (error.message || 'Terjadi kesalahan pada server'));
    }
  }

  async update(id: string, data: {
    code?: string;
    description?: string;
    discountType?: 'PERCENTAGE' | 'FIXED';
    discountValue?: number;
    minPurchase?: number;
    maxDiscount?: number;
    usageLimit?: number;
    perUserLimit?: number;
    startDate?: string;
    endDate?: string;
    isActive?: boolean;
    categoryIds?: string[];
    productIds?: string[];
  }) {
    await this.findOne(id);
 
    const { categoryIds, productIds, ...rest } = data;
    const updateData: any = { ...rest };
    if (data.code) updateData.code = data.code.toUpperCase();
    if (data.startDate) updateData.startDate = new Date(data.startDate);
    if (data.endDate) updateData.endDate = new Date(data.endDate);
    
    if (categoryIds) {
      updateData.categories = {
        set: categoryIds.map(id => ({ id }))
      };
    }
    
    if (productIds) {
      updateData.products = {
        set: productIds.map(id => ({ id }))
      };
    }

    return this.prisma.promo.update({
      where: { id },
      data: updateData,
      include: { categories: true, products: true }
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.promo.delete({ where: { id } });
  }

  async validate(code: string, subtotal: number, userId?: string) {
    const promo = await this.prisma.promo.findUnique({
      where: { code: code.toUpperCase() },
      include: { categories: true, products: true },
    });

    if (!promo) {
      throw new BadRequestException('Kode promo tidak valid');
    }

    if (!promo.isActive) {
      throw new BadRequestException('Promo sudah tidak aktif');
    }

    const now = new Date();
    if (now < promo.startDate) {
      throw new BadRequestException('Promo belum dimulai');
    }
    if (now > promo.endDate) {
      throw new BadRequestException('Promo sudah berakhir');
    }

    if (promo.usageLimit && promo.usedCount >= promo.usageLimit) {
      throw new BadRequestException('Kuota promo sudah habis');
    }

    // Check per-user limit
    if (promo.perUserLimit > 0 && userId) {
      const userUsage = await this.prisma.promoUsage.findUnique({
        where: { userId_promoId: { userId, promoId: promo.id } },
      });
      if (userUsage) {
        throw new BadRequestException('Anda sudah pernah menggunakan promo ini');
      }
    }

    if (subtotal < promo.minPurchase) {
      throw new BadRequestException(
        `Minimum pembelian Rp ${promo.minPurchase.toLocaleString('id-ID')}`,
      );
    }

    // Calculate discount
    let discount = 0;
    let applicableSubtotal = subtotal;

    // If promo is restricted to specific categories or products
    if ((promo.categories.length > 0 || promo.products.length > 0) && userId) {
      const cartItems = await this.prisma.cartItem.findMany({
        where: { userId },
        include: { product: true },
      });
 
      const allowedCategoryIds = promo.categories.map(c => c.id);
      const allowedProductIds = promo.products.map(p => p.id);
      
      const applicableItems = cartItems.filter(item => 
        (allowedCategoryIds.length > 0 && allowedCategoryIds.includes(item.product.categoryId)) ||
        (allowedProductIds.length > 0 && allowedProductIds.includes(item.productId))
      );
 
      if (applicableItems.length === 0) {
        throw new BadRequestException('Promo ini tidak berlaku untuk produk di keranjang Anda');
      }
 
      applicableSubtotal = applicableItems.reduce((sum, item) => 
        sum + (item.product.price * item.quantity), 0
      );
    }

    if (promo.discountType === 'PERCENTAGE') {
      discount = Math.floor(applicableSubtotal * promo.discountValue / 100);
      if (promo.maxDiscount && discount > promo.maxDiscount) {
        discount = promo.maxDiscount;
      }
    } else {
      // For fixed discount, it cannot exceed the applicable subtotal
      discount = Math.min(promo.discountValue, applicableSubtotal);
    }

    if (discount > subtotal) discount = subtotal;

    return {
      valid: true,
      promo: {
        id: promo.id,
        code: promo.code,
        description: promo.description,
        discountType: promo.discountType,
        discountValue: promo.discountValue,
        minPurchase: promo.minPurchase,
        maxDiscount: promo.maxDiscount,
        categories: promo.categories.map(c => ({ id: c.id, name: c.name })),
        products: promo.products.map(p => ({ id: p.id, name: p.name })),
      },
      discount,
      applicableSubtotal,
      total: subtotal - discount,
    };
  }

  async incrementUsage(code: string, userId?: string) {
    const promo = await this.prisma.promo.update({
      where: { code: code.toUpperCase() },
      data: { usedCount: { increment: 1 } },
    });

    // Record per-user usage
    if (userId) {
      await this.prisma.promoUsage.upsert({
        where: { userId_promoId: { userId, promoId: promo.id } },
        create: { userId, promoId: promo.id },
        update: {},
      });
    }

    return promo;
  }
}

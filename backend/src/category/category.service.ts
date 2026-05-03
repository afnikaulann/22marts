import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(
    private prisma: PrismaService,
    private supabaseService: SupabaseService,
  ) {}

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  async findAll() {
    return this.prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } },
    });

    if (!category) {
      throw new NotFoundException('Kategori tidak ditemukan');
    }

    return category;
  }

  async create(dto: CreateCategoryDto, file?: Express.Multer.File) {
    const slug = this.generateSlug(dto.name);
    let thumbnail: string | undefined;

    if (file) {
      const extension = file.originalname.split('.').pop();
      const path = `${slug}-${Date.now()}.${extension}`;
      const url = await this.supabaseService.uploadFile(
        'categories',
        path,
        file.buffer,
        file.mimetype,
      );
      if (url) thumbnail = url;
    }

    // Ensure isActive is boolean
    const isActive = typeof dto.isActive === 'string' 
      ? dto.isActive === 'true' 
      : dto.isActive ?? true;

    return this.prisma.category.create({
      data: {
        name: dto.name,
        slug,
        icon: dto.icon,
        thumbnail,
        isActive,
      },
    });
  }

  async update(id: string, dto: UpdateCategoryDto, file?: Express.Multer.File) {
    const category = await this.findOne(id);

    const data: any = { ...dto };
    if (dto.name) {
      data.slug = this.generateSlug(dto.name);
    }

    if (file) {
      const extension = file.originalname.split('.').pop();
      const path = `${data.slug || category.slug}-${Date.now()}.${extension}`;
      const url = await this.supabaseService.uploadFile(
        'categories',
        path,
        file.buffer,
        file.mimetype,
      );
      if (url) data.thumbnail = url;
    }

    // Ensure isActive is boolean if present
    if (data.isActive !== undefined) {
      data.isActive = typeof data.isActive === 'string' 
        ? data.isActive === 'true' 
        : data.isActive;
    }

    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.category.delete({
      where: { id },
    });
  }
}

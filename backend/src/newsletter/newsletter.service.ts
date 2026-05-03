import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewsletterService {
  constructor(private prisma: PrismaService) {}

  async subscribe(phone: string) {
    try {
      const existing = await this.prisma.newsletterSubscriber.findUnique({
        where: { phone },
      });
      if (existing) {
        return { message: 'Nomor WhatsApp sudah terdaftar.' };
      }
      const newSub = await this.prisma.newsletterSubscriber.create({
        data: { phone },
      });
      return { message: 'Berhasil mendaftar!', data: newSub };
    } catch (error) {
      throw new Error('Gagal mendaftar. Silakan coba lagi.');
    }
  }

  async getAll() {
    return this.prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}

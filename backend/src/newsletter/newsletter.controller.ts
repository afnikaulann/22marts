import {
  Controller,
  Post,
  Body,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { NewsletterService } from './newsletter.service';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  async subscribe(@Body() body: { phone: string }) {
    if (!body.phone) {
      throw new BadRequestException('Nomor WhatsApp wajib diisi');
    }
    return this.newsletterService.subscribe(body.phone);
  }

  @Get()
  async getAll() {
    return this.newsletterService.getAll();
  }
}

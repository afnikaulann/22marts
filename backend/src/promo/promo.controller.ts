import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PromoService } from './promo.service';
import { CreatePromoDto, UpdatePromoDto } from './dto';

@Controller('promos')
export class PromoController {
  constructor(private promoService: PromoService) {}

  @Get()
  findAll() {
    return this.promoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promoService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreatePromoDto) {
    return this.promoService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePromoDto) {
    return this.promoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promoService.remove(id);
  }

  @Post('validate')
  validate(@Body() body: { code: string; subtotal: number; userId?: string }) {
    return this.promoService.validate(body.code, body.subtotal, body.userId);
  }
}

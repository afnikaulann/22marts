import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsArray,
  IsDateString,
} from 'class-validator';

export class CreatePromoDto {
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(['PERCENTAGE', 'FIXED'])
  discountType: 'PERCENTAGE' | 'FIXED';

  @IsNumber()
  discountValue: number;

  @IsOptional()
  @IsNumber()
  minPurchase?: number;

  @IsOptional()
  @IsNumber()
  maxDiscount?: number;

  @IsOptional()
  @IsNumber()
  usageLimit?: number;

  @IsOptional()
  @IsNumber()
  perUserLimit?: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categoryIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  productIds?: string[];
}

export class UpdatePromoDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['PERCENTAGE', 'FIXED'])
  discountType?: 'PERCENTAGE' | 'FIXED';

  @IsOptional()
  @IsNumber()
  discountValue?: number;

  @IsOptional()
  @IsNumber()
  minPurchase?: number;

  @IsOptional()
  @IsNumber()
  maxDiscount?: number;

  @IsOptional()
  @IsNumber()
  usageLimit?: number;

  @IsOptional()
  @IsNumber()
  perUserLimit?: number;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categoryIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  productIds?: string[];
}

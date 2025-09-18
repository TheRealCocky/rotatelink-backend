import {
  IsString,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateLinkDto {
  @IsString()
  originalUrl: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  alternativeUrls: string[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  weights?: number[];
}

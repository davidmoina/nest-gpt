import { IsBase64, IsOptional, IsString } from 'class-validator';

export class ImageGenerationDto {
  @IsString()
  readonly prompt: string;

  @IsBase64()
  @IsOptional()
  readonly originalImage?: string;

  @IsBase64()
  @IsOptional()
  readonly maskImage?: string;
}

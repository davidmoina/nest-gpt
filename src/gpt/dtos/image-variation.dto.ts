import { IsUrl } from 'class-validator';

export class ImageVariationDto {
  @IsUrl({
    require_tld: false,
    require_protocol: true,
  })
  readonly baseImage: string;
}

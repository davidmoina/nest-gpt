import { InternalServerErrorException } from '@nestjs/common';
import { mkdirSync } from 'fs';
import path from 'path';
import sharp from 'sharp';

export const downloadImageAsPng = async (url: string, fullPath?: boolean) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new InternalServerErrorException('Download image was not possible');
  }

  const folderPath = path.resolve('./', './generated/images/');
  mkdirSync(folderPath, { recursive: true });

  const fileName = `${new Date().getTime()}.png`;
  const buffer = Buffer.from(await response.arrayBuffer());

  // writeFileSync(`${folderPath}/${fileName}`, buffer);

  const completePath = path.join(folderPath, fileName);

  await sharp(buffer).png().ensureAlpha().toFile(completePath);

  return fullPath ? completePath : fileName;
};

export const downloadBase64ImageAsPng = async (
  base64Image: string,
  fullPath?: boolean,
) => {
  // Remover encabezado
  base64Image = base64Image.split(';base64,').pop();
  const imageBuffer = Buffer.from(base64Image, 'base64');

  const folderPath = path.resolve('./', './generated/images/');
  mkdirSync(folderPath, { recursive: true });

  const imageNamePng = `${new Date().getTime()}-64.png`;

  const completePath = path.join(folderPath, imageNamePng);

  // Transformar a RGBA, png // Así lo espera OpenAI
  await sharp(imageBuffer).png().ensureAlpha().toFile(completePath);

  return fullPath ? completePath : imageNamePng;
};

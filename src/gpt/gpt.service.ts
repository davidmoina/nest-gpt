import { Injectable, NotFoundException } from '@nestjs/common';
import {
  audioToTextUseCase,
  orthographyCheckUseCase,
  prosConsDiscusserStreamUseCase,
  prosConsDiscusserUseCase,
  textToAudioUseCase,
  translateStreamUseCase,
  translateUseCase,
} from './use-cases';
import {
  AudioToTextDto,
  OrthographyDto,
  ProsConsDiscusserDto,
  TextToAudioDto,
  TranslateDto,
} from './dtos';
import OpenAI from 'openai';
import path from 'path';
import fs from 'fs';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }

  async prosConsDiscusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDiscusserUseCase(this.openai, { prompt });
  }

  async prosConsDiscusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDiscusserStreamUseCase(this.openai, { prompt });
  }

  async translateText({ lang, prompt }: TranslateDto) {
    return await translateUseCase(this.openai, { lang, prompt });
  }

  async translateTextStream({ lang, prompt }: TranslateDto) {
    return await translateStreamUseCase(this.openai, { lang, prompt });
  }

  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, { voice, prompt });
  }

  textToAudioGetter(fileId: string) {
    const filePath = path.resolve(
      __dirname,
      '../../generated/audios',
      `${fileId}.mp3`,
    );

    const fileExist = fs.existsSync(filePath);

    if (!fileExist) {
      throw new NotFoundException(`File ${fileId} not found`);
    }

    return filePath;
  }

  async audioToText(
    audioFile: Express.Multer.File,
    audioToTextDto?: AudioToTextDto,
  ) {
    return await audioToTextUseCase(this.openai, {
      prompt: audioToTextDto.prompt,
      audioFile,
    });
  }
}

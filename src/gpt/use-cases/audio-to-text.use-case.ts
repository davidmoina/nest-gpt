import { createReadStream } from 'fs';
import OpenAI from 'openai';

interface Options {
  prompt?: string;
  audioFile: Express.Multer.File;
}

export const audioToTextUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt, audioFile } = options;

  const response = await openai.audio.transcriptions.create({
    model: 'whisper-1',
    file: createReadStream(audioFile.path),
    prompt, // debe ser en el mismo idioma del audio
    language: 'es',
    response_format: 'verbose_json',
    // response_format: 'srt' | 'vtt' // otros formatos
  });

  return response;
};

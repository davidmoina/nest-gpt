import OpenAI from 'openai';

interface Options {
  prompt: string;
  lang: string;
}

export const translateStreamUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { lang, prompt } = options;

  // This returns stream of data
  return await openai.chat.completions.create({
    stream: true,
    model: 'gpt-3.5-turbo-1106',
    messages: [
      {
        role: 'system',
        content: `Traduce el siguiente texto al idioma ${lang}:${prompt}`,
      },
    ],
    temperature: 0.2,
  });
};

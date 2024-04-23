import OpenAI from 'openai';

interface Options {
  prompt: string;
  lang: string;
}

export const translateUseCase = async (openai: OpenAI, options: Options) => {
  const { lang, prompt } = options;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-1106',
    messages: [
      {
        role: 'system',
        content: `Traduce el siguiente texto al idioma ${lang}:${prompt}`,
      },
    ],
    temperature: 0.2,
  });

  return { message: response.choices[0].message.content };
};

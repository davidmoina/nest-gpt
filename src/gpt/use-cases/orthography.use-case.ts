import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Te serán proveídos textos en español con posibles errores ortográficos y gramaticales.
        Las palabras usadas deben existir en el diccionario de la Real Academia Española.
        Debes responder en formato JSON.
        Tu tarea es corregirlos y retornar información y soluciones, 
        También debes de dar un porcentaje de acierto por el usuario. 
        Si no hay errores, debes retornar un mensaje de felicitaciones.
        
        Ejemplo de salida :
        {
          userScore: number,
          error: string[], // ['error -> solución'],
          message: string // 'Usa texto y emojis para felicitar al usuario'
        }`,
      },
      { role: 'user', content: prompt },
    ],
    model: 'gpt-4-turbo',
    max_tokens: 150,
    response_format: {
      type: 'json_object',
    },
  });

  const jsonResp = JSON.parse(completion.choices[0].message.content);

  return jsonResp;
};

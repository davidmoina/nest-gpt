import { InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';

interface Options {
  threadId: string;
  assistantId: string;
}

export const createRunUseCase = async (openai: OpenAI, options: Options) => {
  const { assistantId, threadId } = options;

  const run = await openai.beta.threads.runs.createAndPoll(threadId, {
    assistant_id: assistantId,
  });

  if (run.status === 'failed') {
    throw new InternalServerErrorException('Run failed');
  }

  return run;
};

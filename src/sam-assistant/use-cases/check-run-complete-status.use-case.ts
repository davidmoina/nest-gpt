import { InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';

interface Options {
  threadId: string;
  runId: string;
}

// Use only if whe use "create" method to create a run
export const checkRunCompleteStatusUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { threadId, runId } = options;

  const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);

  console.log({ status: runStatus.status });

  if (runStatus.status === 'completed') {
    return runStatus;
  } else if (runStatus.status === 'failed') {
    throw new InternalServerErrorException('Run failed');
  }

  // Wait a second before call recursive function
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return await checkRunCompleteStatusUseCase(openai, options);
};

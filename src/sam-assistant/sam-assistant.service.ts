import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  createMessageUseCase,
  createRunUseCase,
  createThreadUseCase,
  getMessageListByThreadUseCase,
} from './use-cases';
import { QuestionDto } from './dtos/question.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SamAssistantService {
  constructor(private readonly configService: ConfigService) {}

  private assistantId = this.configService.get<string>('OPENAI_ASSISTANT_ID');

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async createThread() {
    return await createThreadUseCase(this.openai);
  }

  async userQuestion(questionDto: QuestionDto) {
    const { question, threadId } = questionDto;

    await createMessageUseCase(this.openai, {
      question,
      threadId,
    });

    await createRunUseCase(this.openai, {
      threadId,
      assistantId: this.assistantId,
    });

    // obsolete because now whe have "createAndPoll" method in openai SDK to cerate a run
    // await checkRunCompleteStatusUseCase(this.openai, {
    //   runId: run.id,
    //   threadId,
    // });

    const messages = await getMessageListByThreadUseCase(this.openai, {
      threadId,
    });

    return messages;
  }
}

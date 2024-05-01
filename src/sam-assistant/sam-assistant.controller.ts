import { Body, Controller, Post } from '@nestjs/common';
import { SamAssistantService } from './sam-assistant.service';
import { QuestionDto } from './dtos/question.dto';

@Controller('sam-assistant')
export class SamAssistantController {
  constructor(private readonly samAssistantService: SamAssistantService) {}

  @Post('create-thread')
  createThread() {
    return this.samAssistantService.createThread();
  }

  @Post('user-question')
  userQuestion(@Body() questionDto: QuestionDto) {
    return this.samAssistantService.userQuestion(questionDto);
  }
}

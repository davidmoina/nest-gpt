import { Module } from '@nestjs/common';
import { SamAssistantService } from './sam-assistant.service';
import { SamAssistantController } from './sam-assistant.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [SamAssistantController],
  providers: [SamAssistantService],
})
export class SamAssistantModule {}

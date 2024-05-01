import OpenAI from 'openai';
import { TextContentBlock } from 'openai/resources/beta/threads/messages';

interface Options {
  threadId: string;
}

export const getMessageListByThreadUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { threadId } = options;

  const messageList = await openai.beta.threads.messages.list(threadId);

  const messages = [];

  for (const message of messageList.data.reverse()) {
    messages.push({
      role: message.role,
      content: (message.content[0] as TextContentBlock).text.value,
    });
  }

  return messages;
};

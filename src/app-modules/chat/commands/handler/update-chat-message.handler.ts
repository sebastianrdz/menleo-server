import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateChatMessageCommand } from '../impl/update-chat-message.command';
import { ChatRepository } from '@app-modules/chat/chat.repository';
import { Chat } from '@app-modules/chat/chat.schema';

@CommandHandler(UpdateChatMessageCommand)
export class UpdateChatMessageHandler
  implements ICommandHandler<UpdateChatMessageCommand>
{
  constructor(private readonly chatRepository: ChatRepository) {}

  async execute(command: UpdateChatMessageCommand): Promise<Chat> {
    return this.chatRepository.updateChatMessages(command.id, command.model);
  }
}

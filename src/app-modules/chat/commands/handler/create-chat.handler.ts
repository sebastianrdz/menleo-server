import { ChatRepository } from '@app-modules/chat/chat.repository';
import { Chat } from '@app-modules/chat/chat.schema';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateChatCommand } from '@app-modules/chat/commands/impl/create-chat.command';

@CommandHandler(CreateChatCommand)
export class CreateChatHandler implements ICommandHandler<CreateChatCommand> {
  constructor(private readonly chatRepository: ChatRepository) {}

  async execute(command: CreateChatCommand): Promise<Chat> {
    return this.chatRepository.create(command.model);
  }
}

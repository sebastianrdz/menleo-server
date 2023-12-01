import { ChatRepository } from '@app-modules/chat/chat.repository';
import { Chat } from '@app-modules/chat/chat.schema';
import { QueryHandler } from '@nestjs/cqrs';
import { GetChatsQuery } from '@app-modules/chat/queries/impl/get-chats.query';

@QueryHandler(GetChatsQuery)
export class GetChatsHandler {
  constructor(private readonly chatRepository: ChatRepository) {}

  async execute(query: GetChatsQuery): Promise<Chat[]> {
    return this.chatRepository.findAll();
  }
}

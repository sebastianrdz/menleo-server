import { ChatRepository } from '@app-modules/chat/chat.repository';
import { Chat } from '@app-modules/chat/chat.schema';
import { QueryHandler } from '@nestjs/cqrs';
import { GetChatsOfUserQuery } from '@app-modules/chat/queries/impl/get-chats-of-user.query';

@QueryHandler(GetChatsOfUserQuery)
export class GetChatsOfUserHandler {
  constructor(private readonly chatRepository: ChatRepository) {}

  async execute(query: GetChatsOfUserQuery): Promise<Chat[]> {
    return this.chatRepository.findAllWhereUserIs(query.username);
  }
}

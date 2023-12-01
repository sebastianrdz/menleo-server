import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from '@app-modules/chat/chat.controller';
import { ChatRepository } from '@app-modules/chat/chat.repository';
import { Chat, ChatModel } from '@app-modules/chat/chat.schema';
import { CreateChatHandler } from '@app-modules/chat/commands/handler/create-chat.handler';
import { GetChatsOfUserHandler } from '@app-modules/chat/queries/handler/get-chats-of-user.handler';
import { GetChatsHandler } from '@app-modules/chat/queries/handler/get-chats.handler';
import { UpdateChatMessageHandler } from '@app-modules/chat/commands/handler/update-chat-message.handler';

const CommandHandlers = [CreateChatHandler, UpdateChatMessageHandler];
const QueryHandlers = [GetChatsHandler, GetChatsOfUserHandler];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatModel }])
  ],
  controllers: [ChatController],
  providers: [ChatRepository, ...QueryHandlers, ...CommandHandlers]
})
export class ChatModule {}

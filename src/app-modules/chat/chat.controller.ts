import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import {
  ChatDto,
  CreateChatDto,
  UpdateChatMessageDto
} from '@app-modules/chat/chat.types.dto';
import { CreateChatCommand } from '@app-modules/chat/commands/impl/create-chat.command';
import { GetChatsOfUserQuery } from '@app-modules/chat/queries/impl/get-chats-of-user.query';
import { GetChatsQuery } from '@app-modules/chat/queries/impl/get-chats.query';
import { UpdateChatMessageCommand } from '@app-modules/chat/commands/impl/update-chat-message.command';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('')
  @ApiOperation({
    operationId: 'getChats',
    summary: 'Get Chats'
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all Chats.',
    type: ChatDto,
    isArray: true
  })
  @ApiResponse({
    status: 500,
    description: 'Unexpected error occurred while fetching Chat.'
  })
  async getChats(): Promise<ChatDto[]> {
    return await this.queryBus.execute(new GetChatsQuery());
  }

  @Get(':username')
  @ApiOperation({
    operationId: 'getChatsOfUser',
    summary: 'Get Chats according to username'
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all Chats related to the user.',
    type: ChatDto,
    isArray: true
  })
  @ApiResponse({
    status: 500,
    description: 'Unexpected error occurred while fetching Chat for user.'
  })
  async getChatsOfUser(
    @Param('username') username: string
  ): Promise<ChatDto[]> {
    return await this.queryBus.execute(new GetChatsOfUserQuery(username));
  }

  @Post('')
  @ApiOperation({
    operationId: 'createChat',
    summary: 'Create Chat'
  })
  @ApiBearerAuth()
  @ApiBody({
    type: CreateChatDto
  })
  @ApiResponse({
    status: 200,
    description: 'Create new Chat.',
    type: ChatDto
  })
  @ApiResponse({
    status: 500,
    description: 'Unexpected error occurred while creating Chat.'
  })
  async createChat(@Body() createChatDto: CreateChatDto): Promise<ChatDto> {
    return await this.commandBus.execute(new CreateChatCommand(createChatDto));
  }

  @Patch(':chat_id')
  @ApiOperation({
    operationId: 'updateChatMessages',
    summary: 'Update Chat Messages'
  })
  @ApiBearerAuth()
  @ApiBody({
    type: UpdateChatMessageDto
  })
  @ApiResponse({
    status: 200,
    description: 'Update new Chat Message.',
    type: ChatDto
  })
  @ApiResponse({
    status: 500,
    description: 'Unexpected error occurred while updating Chat messages.'
  })
  async addMessage(
    @Param('chat_id') chatId: string,
    @Body() chatMessageDto: UpdateChatMessageDto
  ): Promise<ChatDto> {
    return await this.commandBus.execute(
      new UpdateChatMessageCommand(chatId, chatMessageDto)
    );
  }
}

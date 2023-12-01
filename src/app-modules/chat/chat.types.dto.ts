import { ApiProperty } from '@nestjs/swagger';
import { IChatMessage } from './chat.schema';

export class ChatDto {
  @ApiProperty({ example: '1234' })
  id: string;
  @ApiProperty({ example: ['johnsmith', 'samsmith'] })
  usernames: string[];
  @ApiProperty({
    example: [{ text: 'Hello', username: 'johnsmith', timestamp: '01/01/23' }]
  })
  messages: IChatMessage[];
}

export class CreateChatDto {
  @ApiProperty({ example: ['johnsmith', 'samsmith'] })
  usernames: string[];
  @ApiProperty({
    example: [{ text: 'Hello', username: 'johnsmith', timestamp: '01/01/23' }]
  })
  messages: IChatMessage[];
}

export class UpdateChatMessageDto {
  @ApiProperty({ example: 'Hello' })
  text: string;
  @ApiProperty({ example: 'johnsmith' })
  username: string;
  @ApiProperty({ example: '01/01/23' })
  timestamp: string;
}

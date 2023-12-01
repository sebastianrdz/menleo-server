import { UpdateChatMessageDto } from '@app-modules/chat/chat.types.dto';
import { ICommand } from '@nestjs/cqrs';

export class UpdateChatMessageCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly model: UpdateChatMessageDto
  ) {}
}

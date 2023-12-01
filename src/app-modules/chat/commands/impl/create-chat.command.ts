import { CreateChatDto } from '@app-modules/chat/chat.types.dto';
import { ICommand } from '@nestjs/cqrs';

export class CreateChatCommand implements ICommand {
  constructor(public readonly model: CreateChatDto) {}
}

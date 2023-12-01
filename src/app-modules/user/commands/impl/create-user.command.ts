import { ICommand } from '@nestjs/cqrs';
import { CreateUserDto } from '@app-modules/user/user.types.dto';

export class CreateUserCommand implements ICommand {
  constructor(public readonly model: CreateUserDto) {}
}

import { ICommand } from '@nestjs/cqrs';
import { UpdateUserDto } from '@app-modules/user/user.types.dto';

export class UpdateUserCommand implements ICommand {
  constructor(public id: string, public model: UpdateUserDto) {}
}

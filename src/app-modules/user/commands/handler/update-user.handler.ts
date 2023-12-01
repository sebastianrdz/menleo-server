import { CommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '@app-modules/user/user.repository';
import { User } from '@app-modules/user/user.schema';
import { UpdateUserCommand } from '@app-modules/user/commands/impl/update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    return this.userRepository.update(command.id, command.model);
  }
}

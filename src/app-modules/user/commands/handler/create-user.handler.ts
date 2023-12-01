import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '@app-modules/user/user.repository';
import { User } from '@app-modules/user/user.schema';
import { CreateUserCommand } from '@app-modules/user/commands//impl/create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<User> {
    return this.userRepository.create(command.model);
  }
}

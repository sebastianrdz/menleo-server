import { QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '@app-modules/user/user.repository';
import { User } from '@app-modules/user/user.schema';
import { GetUserQuery } from '@app-modules/user/queries/impl/get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserQuery): Promise<User> {
    return this.userRepository.findOne(query.email);
  }
}

import { QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '@app-modules/user/user.repository';
import { User } from '@app-modules/user/user.schema';
import { GetUsersQuery } from '@app-modules/user/queries//impl/get-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUsersQuery): Promise<User[]> {
    return this.userRepository.findAll();
  }
}

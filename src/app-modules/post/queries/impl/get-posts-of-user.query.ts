import { IQuery } from '@nestjs/cqrs';
export class GetPostsOfUserQuery implements IQuery {
  constructor(public readonly author_username: string) {}
}

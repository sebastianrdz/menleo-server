import { IQuery } from '@nestjs/cqrs';
export class GetChatsOfUserQuery implements IQuery {
  constructor(public readonly username: string) {}
}

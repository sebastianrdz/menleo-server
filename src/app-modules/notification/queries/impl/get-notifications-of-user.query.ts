import { IQuery } from '@nestjs/cqrs';
export class GetNotificationsOfUserQuery implements IQuery {
  constructor(public readonly user_id: string) {}
}

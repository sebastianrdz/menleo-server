import { QueryHandler } from '@nestjs/cqrs';
import { GetNotificationsOfUserQuery } from '@app-modules/notification/queries/impl/get-notifications-of-user.query';
import { NotificationRepository } from '@app-modules/notification/notification.repository';
import { Notification } from '@app-modules/notification/notification.schema';

@QueryHandler(GetNotificationsOfUserQuery)
export class GetNotificationsOfUserHandler {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  async execute(query: GetNotificationsOfUserQuery): Promise<Notification[]> {
    return this.notificationRepository.findAllWhereUserIs(query.user_id);
  }
}

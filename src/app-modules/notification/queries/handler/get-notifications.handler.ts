import { QueryHandler } from '@nestjs/cqrs';
import { GetNotificationsQuery } from '@app-modules/notification/queries/impl/get-notifications.query';
import { NotificationRepository } from '@app-modules/notification/notification.repository';
import { Notification } from '@app-modules/notification/notification.schema';

@QueryHandler(GetNotificationsQuery)
export class GetNotificationsHandler {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  async execute(query: GetNotificationsQuery): Promise<Notification[]> {
    return this.notificationRepository.findAll();
  }
}

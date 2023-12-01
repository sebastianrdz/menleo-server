import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotificationRepository } from '@app-modules/notification/notification.repository';
import { CreateNotificationCommand } from '@app-modules/notification/commands/impl/create-notification.command';
import { Notification } from '@app-modules/notification/notification.schema';

@CommandHandler(CreateNotificationCommand)
export class CreateNotificationHandler
  implements ICommandHandler<CreateNotificationCommand>
{
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  async execute(command: CreateNotificationCommand): Promise<Notification> {
    return this.notificationRepository.create(command.model);
  }
}

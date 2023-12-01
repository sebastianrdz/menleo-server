import { ICommand } from '@nestjs/cqrs';
import { CreateNotificationDto } from '@app-modules/notification/notification.types.dto';

export class CreateNotificationCommand implements ICommand {
  constructor(public readonly model: CreateNotificationDto) {}
}

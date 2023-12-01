import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { GetNotificationsHandler } from '@app-modules/notification/queries/handler/get-notifications.handler';
import {
  Notification,
  NotificationModel
} from '@app-modules/notification/notification.schema';
import { NotificationController } from '@app-modules/notification/notification.controller';
import { NotificationRepository } from '@app-modules/notification/notification.repository';
import { CreateNotificationHandler } from '@app-modules/notification/commands/handler/create-notification.handler';
import { GetNotificationsOfUserHandler } from '@app-modules/notification/queries/handler/get-notifications-of-user.handler';

const CommandHandlers = [CreateNotificationHandler];
const QueryHandlers = [GetNotificationsHandler, GetNotificationsOfUserHandler];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationModel }
    ])
  ],
  controllers: [NotificationController],
  providers: [NotificationRepository, ...QueryHandlers, ...CommandHandlers]
})
export class NotificationModule {}

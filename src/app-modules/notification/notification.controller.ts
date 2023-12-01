import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import {
  CreateNotificationDto,
  NotificationDto
} from '@app-modules/notification/notification.types.dto';
import { GetNotificationsQuery } from '@app-modules/notification/queries/impl/get-notifications.query';
import { CreateNotificationCommand } from '@app-modules/notification/commands/impl/create-notification.command';
import { GetNotificationsOfUserQuery } from '@app-modules/notification/queries/impl/get-notifications-of-user.query';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Get('')
  @ApiOperation({
    operationId: 'getNotifications',
    summary: 'Get notifications'
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all notifications.',
    type: NotificationDto,
    isArray: true
  })
  @ApiResponse({
    status: 500,
    description: 'Unexpected error occurred while fetching notification.'
  })
  async getNotifications(): Promise<NotificationDto[]> {
    return await this.queryBus.execute(new GetNotificationsQuery());
  }

  @Get(':user_id')
  @ApiOperation({
    operationId: 'getNotificationsOfUser',
    summary: 'Get notifications according to user id'
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description:
      'Successfully retrieved all notifications related to the user.',
    type: NotificationDto,
    isArray: true
  })
  @ApiResponse({
    status: 500,
    description:
      'Unexpected error occurred while fetching notification for user.'
  })
  async getNotificationsOfUser(
    @Param('user_id') user_id: string
  ): Promise<NotificationDto[]> {
    return await this.queryBus.execute(
      new GetNotificationsOfUserQuery(user_id)
    );
  }

  @Post('')
  @ApiOperation({
    operationId: 'createNotification',
    summary: 'Create Notification'
  })
  @ApiBearerAuth()
  @ApiBody({
    type: CreateNotificationDto
  })
  @ApiResponse({
    status: 200,
    description: 'Create new Notification.',
    type: NotificationDto
  })
  @ApiResponse({
    status: 500,
    description: 'Unexpected error occurred while creating Notification.'
  })
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto
  ): Promise<NotificationDto> {
    return await this.commandBus.execute(
      new CreateNotificationCommand(createNotificationDto)
    );
  }
}

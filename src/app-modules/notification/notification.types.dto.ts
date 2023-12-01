import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from './notification.schema';

export class NotificationDto {
  @ApiProperty({ example: '1234' })
  id: string;
  @ApiProperty({ example: 'comment' })
  type: NotificationType;
  @ApiProperty({ example: 'Yo have a new like' })
  content: string;
  @ApiProperty({ example: '1234' })
  user_id: string;
  @ApiProperty({ example: '01/01/23' })
  timestamp: Date;
}

export class CreateNotificationDto {
  @ApiProperty({ example: 'comment' })
  type: NotificationType;
  @ApiProperty({ example: 'Yo have a new like' })
  content: string;
  @ApiProperty({ example: '1234' })
  user_id: string;
  @ApiProperty({ example: '01/01/23' })
  timestamp: Date;
}

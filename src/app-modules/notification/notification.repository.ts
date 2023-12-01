import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from '@app-modules/notification/notification.schema';
import { CreateNotificationDto } from '@app-modules/notification/notification.types.dto';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>
  ) {}

  async findAll(): Promise<Notification[]> {
    return this.notificationModel.find().exec();
  }

  async findAllWhereUserIs(user_id: string): Promise<Notification[]> {
    return this.notificationModel.find({ user_id }).exec();
  }

  async create(
    createNotificationDto: CreateNotificationDto
  ): Promise<Notification> {
    const notification = new this.notificationModel(createNotificationDto);
    return await notification.save();
  }
}

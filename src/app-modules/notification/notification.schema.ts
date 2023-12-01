import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationType =
  | 'like'
  | 'comment'
  | 'follow'
  | 'mention'
  | 'other';

@Schema()
export class Notification extends Document {
  @Prop({ required: true })
  type: NotificationType;
  @Prop({ required: true })
  content: string;
  @Prop({ required: true })
  user_id: string;
  @Prop({ required: true })
  timestamp: Date;
}

export const NotificationModel = SchemaFactory.createForClass(Notification);

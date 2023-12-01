import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IChatMessage {
  text: string;
  username: string;
  timestamp: Date;
}

@Schema()
export class Chat extends Document {
  @Prop({ required: true })
  usernames: string[];
  @Prop({ required: true })
  messages: IChatMessage[];
}

export const ChatModel = SchemaFactory.createForClass(Chat);

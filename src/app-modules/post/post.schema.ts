import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop({ required: true })
  content: string;
  @Prop({ required: true })
  author_username: string;
  @Prop({ required: true })
  timestamp: Date;
}

export const PostModel = SchemaFactory.createForClass(Post);

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from '@app-modules/chat/chat.schema';
import {
  CreateChatDto,
  UpdateChatMessageDto
} from '@app-modules/chat/chat.types.dto';

@Injectable()
export class ChatRepository {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<Chat>
  ) {}

  async findAll(): Promise<Chat[]> {
    return await this.chatModel.find().exec();
  }

  async findAllWhereUserIs(username: string): Promise<Chat[]> {
    return await this.chatModel.find({ usernames: username }).exec();
  }

  async updateChatMessages(
    chatId: string,
    message: UpdateChatMessageDto
  ): Promise<Chat> {
    return await this.chatModel
      .findByIdAndUpdate(
        chatId,
        { $push: { messages: message } },
        { new: true }
      )
      .exec();
  }

  async create(createChatDto: CreateChatDto): Promise<Chat> {
    const chat = new this.chatModel(createChatDto);
    return await chat.save();
  }
}

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@app-modules/user/user.schema';
import { CreateUserDto, UpdateUserDto } from '@app-modules/user/user.types.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return await user.save();
  }

  async update(id: string, createUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, createUserDto, { new: true });
  }
}

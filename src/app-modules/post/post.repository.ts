import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '@app-modules/post/post.schema';
import { CreatePostDto } from '@app-modules/post/post.types.dto';

@Injectable()
export class PostRepository {
  constructor(
    @InjectModel(Post.name)
    private postModel: Model<Post>
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findAllWhereUserIs(author_username: string): Promise<Post[]> {
    return this.postModel.find({ author_username }).exec();
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = new this.postModel(createPostDto);
    return await post.save();
  }
}

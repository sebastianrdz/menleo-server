import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from '@app-modules/post/post.controller';
import { PostRepository } from '@app-modules/post/post.repository';
import { PostModel, Post } from '@app-modules/post/post.schema';
import { CreatePostHandler } from '@app-modules/post/commands/handler/create-post.handler';
import { GetPostsOfUserHandler } from '@app-modules/post/queries/handler/get-posts-of-user.handler';
import { GetPostsHandler } from '@app-modules/post/queries/handler/get-posts.handler';

const CommandHandlers = [CreatePostHandler];
const QueryHandlers = [GetPostsHandler, GetPostsOfUserHandler];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostModel }])
  ],
  controllers: [PostController],
  providers: [PostRepository, ...QueryHandlers, ...CommandHandlers]
})
export class PostModule {}

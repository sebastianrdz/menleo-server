import { PostRepository } from '@app-modules/post/post.repository';
import { Post } from '@app-modules/post/post.schema';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from '@app-modules/post/commands/impl/create-post.command';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(command: CreatePostCommand): Promise<Post> {
    return this.postRepository.create(command.model);
  }
}

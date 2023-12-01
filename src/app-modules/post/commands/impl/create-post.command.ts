import { CreatePostDto } from '@app-modules/post/post.types.dto';
import { ICommand } from '@nestjs/cqrs';

export class CreatePostCommand implements ICommand {
  constructor(public readonly model: CreatePostDto) {}
}

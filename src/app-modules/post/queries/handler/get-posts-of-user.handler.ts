import { PostRepository } from '@app-modules/post/post.repository';
import { Post } from '@app-modules/post/post.schema';
import { QueryHandler } from '@nestjs/cqrs';
import { GetPostsOfUserQuery } from '@app-modules/post/queries/impl/get-posts-of-user.query';

@QueryHandler(GetPostsOfUserQuery)
export class GetPostsOfUserHandler {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(query: GetPostsOfUserQuery): Promise<Post[]> {
    return this.postRepository.findAllWhereUserIs(query.author_username);
  }
}

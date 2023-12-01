import { QueryHandler } from '@nestjs/cqrs';
import { GetPostsQuery } from '@app-modules/post/queries/impl/get-posts.query';
import { PostRepository } from '@app-modules/post/post.repository';
import { Post } from '@app-modules/post/post.schema';

@QueryHandler(GetPostsQuery)
export class GetPostsHandler {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(query: GetPostsQuery): Promise<Post[]> {
    return this.postRepository.findAll();
  }
}

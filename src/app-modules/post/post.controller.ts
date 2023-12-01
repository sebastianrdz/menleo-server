import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { CreatePostDto, PostDto } from '@app-modules/post/post.types.dto';
import { GetPostsQuery } from '@app-modules/post/queries/impl/get-posts.query';
import { GetPostsOfUserQuery } from '@app-modules/post/queries/impl/get-posts-of-user.query';
import { CreatePostCommand } from '@app-modules/post/commands/impl/create-post.command';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Get('')
  @ApiOperation({
    operationId: 'getPosts',
    summary: 'Get posts'
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all posts.',
    type: PostDto,
    isArray: true
  })
  @ApiResponse({
    status: 500,
    description: 'Unexpected error occurred while fetching post.'
  })
  async getPosts(): Promise<PostDto[]> {
    return await this.queryBus.execute(new GetPostsQuery());
  }

  @Get(':author_username')
  @ApiOperation({
    operationId: 'getPostsOfUser',
    summary: 'Get posts according to user username'
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all posts related to the user.',
    type: PostDto,
    isArray: true
  })
  @ApiResponse({
    status: 500,
    description: 'Unexpected error occurred while fetching posts for user.'
  })
  async getPostsOfUser(
    @Param('author_username') author_username: string
  ): Promise<PostDto[]> {
    return await this.queryBus.execute(
      new GetPostsOfUserQuery(author_username)
    );
  }

  @Post('')
  @ApiOperation({
    operationId: 'createPost',
    summary: 'Create Post'
  })
  @ApiBearerAuth()
  @ApiBody({
    type: CreatePostDto
  })
  @ApiResponse({
    status: 200,
    description: 'Create new Post.',
    type: PostDto
  })
  @ApiResponse({
    status: 500,
    description: 'Unexpected error occurred while creating post.'
  })
  async createPost(@Body() createPostDto: CreatePostDto): Promise<PostDto> {
    return await this.commandBus.execute(new CreatePostCommand(createPostDto));
  }
}

import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @ApiProperty({ example: '1234' })
  id: string;
  @ApiProperty({ example: 'Hola mundo!' })
  content: string;
  @ApiProperty({ example: 'johndoesmith' })
  author_username: string;
  @ApiProperty({ example: '01/01/23' })
  timestamp: Date;
}

export class CreatePostDto {
  @ApiProperty({ example: 'Hola mundo!' })
  content: string;
  @ApiProperty({ example: 'johndoesmith' })
  author_username: string;
  @ApiProperty({ example: '01/01/23' })
  timestamp: Date;
}

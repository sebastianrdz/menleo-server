import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: '1234' })
  id: string;
  @ApiProperty({ example: 'johndoe' })
  username: string;
  @ApiProperty({ example: 'john.doe@test.com' })
  email: string;
  @ApiProperty({ example: '1234' })
  password: string;
}

export class CreateUserDto {
  @ApiProperty({ example: 'johndoe' })
  username: string;
  @ApiProperty({ example: 'john.doe@test.com' })
  email: string;
  @ApiProperty({ example: '1234' })
  password: string;
}

export { CreateUserDto as UpdateUserDto };

// export class LoginUserDto {
//   @ApiProperty({ example: 'johndoe' })
//   username: string;
//   @ApiProperty({ example: '1234' })
//   password: string;
// }

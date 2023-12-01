import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

import {
  CreateUserDto,
  UpdateUserDto,
  UserDto
} from '@app-modules/user/user.types.dto';
import { CreateUserCommand } from '@app-modules/user/commands/impl/create-user.command';
import { UpdateUserCommand } from '@app-modules/user/commands/impl/update-user.command';
import { GetUserQuery } from '@app-modules/user/queries/impl/get-user.query';
import { GetUsersQuery } from '@app-modules/user/queries/impl/get-users.query';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Get('')
  @ApiOperation({
    operationId: 'getUsers',
    summary: 'Get users'
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all users.',
    type: UserDto,
    isArray: true
  })
  @ApiResponse({
    status: 500,
    description: 'Unexpected error occurred while fetching users.'
  })
  async getUsers(): Promise<UserDto[]> {
    return await this.queryBus.execute(new GetUsersQuery());
  }

  @Get(':email')
  @ApiOperation({
    operationId: 'getUser',
    summary: 'Get user'
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved user by email.',
    type: UserDto
  })
  @ApiResponse({
    status: 500,
    description: 'Unexpected error occurred while fetching user.'
  })
  async getUser(@Param('email') email: string): Promise<UserDto> {
    return await this.queryBus.execute(new GetUserQuery(email));
  }

  @Post('')
  @ApiOperation({
    operationId: 'createUser',
    summary: 'Create user'
  })
  @ApiBearerAuth()
  @ApiBody({
    type: CreateUserDto
  })
  @ApiResponse({
    status: 200,
    description: 'Create new user.',
    type: UserDto
  })
  @ApiResponse({
    status: 500,
    description: 'Unexpected error occurred while creating user.'
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.commandBus.execute(new CreateUserCommand(createUserDto));
  }

  @Put(':id')
  @ApiOperation({
    operationId: 'updateUser',
    summary: 'Update user'
  })
  @ApiBearerAuth()
  @ApiBody({
    type: UpdateUserDto
  })
  @ApiResponse({
    status: 200,
    description: 'Update new user.',
    type: UserDto
  })
  @ApiResponse({
    status: 500,
    description: 'Unexpected error occurred while updating user.'
  })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserDto> {
    return await this.commandBus.execute(
      new UpdateUserCommand(id, updateUserDto)
    );
  }
}

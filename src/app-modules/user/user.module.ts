import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from '@app-modules/user/user.controller';
import { User, UserModel } from '@app-modules/user/user.schema';
import { UserRepository } from '@app-modules/user/user.repository';

import { CreateUserHandler } from '@app-modules/user/commands/handler/create-user.handler';
import { UpdateUserHandler } from '@app-modules/user/commands/handler/update-user.handler';
import { GetUserHandler } from '@app-modules/user/queries/handler/get-user.handler';
import { GetUsersHandler } from '@app-modules/user/queries/handler/get-users.handler';

const CommandHandlers = [CreateUserHandler, UpdateUserHandler];
const QueryHandlers = [GetUsersHandler, GetUserHandler];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserModel }])
  ],
  controllers: [UserController],
  providers: [UserRepository, ...QueryHandlers, ...CommandHandlers]
})
export class UserModule {}

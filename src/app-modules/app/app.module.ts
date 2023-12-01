import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '@app-modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from '@app-modules/notification/notification.module';
import { PostModule } from '@app-modules/post/post.module';
import { ChatModule } from '@app-modules/chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://sebasstianrdz:${process.env.DBSECRET}@cluster0.ex9srvb.mongodb.net/?retryWrites=true&w=majority`
    ),
    UserModule,
    NotificationModule,
    PostModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

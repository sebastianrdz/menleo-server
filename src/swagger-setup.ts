import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Menleo API')
    .setVersion('1.0')
    .setDescription('Menleo API endpoints.')
    .addBearerAuth()
    .addTag('User', 'Manage users in your organization')
    .addTag('Notification', 'Manage user push notifications')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

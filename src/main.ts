import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app-modules/app/app.module';
import { swaggerConfig } from './swagger-setup';
// import http from 'http';
// import { Server } from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;

  app.enableCors();
  swaggerConfig(app);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );

  // // Socket.io
  // const server = http.createServer((req, res) => {
  //   res.writeHead(200, { 'Content-Type': 'text/plain' });
  //   res.end('WebSocket Server');
  // });
  // const io = new Server(server);
  // io.on('connection', (socket) => {
  //   console.log('A user connected');
  //   socket.on('send message', (msg) => {
  //     // Command: Broadcast the message to all connected clients
  //     console.log(msg);
  //     io.emit('chat message', msg);
  //   });
  //   socket.on('disconnect', () => {
  //     console.log('User disconnected');
  //   });
  // });

  // server.listen(5000, () => {
  //   Logger.log(`🚀 Application is running on: http://localhost:5000`);
  // });
}

bootstrap();

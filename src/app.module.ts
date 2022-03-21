import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoSchema } from './schemas/todo.schema';
import { TodoService } from './todo-service/entities/todo-service.entity';
import { TodoServiceModule } from './todo-service/todo-service.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    TodoServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

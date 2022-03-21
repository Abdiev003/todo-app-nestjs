import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodoServiceService } from './todo-service.service';
import { TodoServiceController } from './todo-service.controller';
import { TodoService } from './entities/todo-service.entity';
import { TodoSchema } from 'src/schemas/todo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TodoService.name, schema: TodoSchema }]),
  ],
  controllers: [TodoServiceController],
  providers: [TodoServiceService],
})
export class TodoServiceModule {}

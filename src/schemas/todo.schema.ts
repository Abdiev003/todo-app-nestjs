import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { TodoService } from 'src/todo-service/entities/todo-service.entity';

export type TodoDocument = TodoService & Document;


export const TodoSchema = SchemaFactory.createForClass(TodoService);
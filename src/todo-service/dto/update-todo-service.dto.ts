import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoServiceDto } from './create-todo-service.dto';

export class UpdateTodoServiceDto extends PartialType(CreateTodoServiceDto) {}

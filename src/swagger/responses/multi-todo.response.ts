import { ApiProperty } from '@nestjs/swagger';
import { TodoService } from 'src/todo-service/entities/todo-service.entity';

export class MultiTodoResponse {
  @ApiProperty({ example: true, description: 'Success status of response' })
  success: boolean;

  @ApiProperty({ example: '', description: 'message' })
  message: string;

  @ApiProperty({ description: 'Todo entity' })
  data: TodoService[];
}

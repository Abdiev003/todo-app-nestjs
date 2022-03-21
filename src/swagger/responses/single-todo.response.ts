import { ApiProperty } from '@nestjs/swagger';
import { TodoService } from 'src/todo-service/entities/todo-service.entity';

export class SingleTodoResponse {
  @ApiProperty({ example: true, description: 'Success status of response' })
  status: boolean;

  @ApiProperty({ example: '', description: 'message' })
  message: string;

  @ApiProperty({ description: 'Message' })
  data: TodoService;
}

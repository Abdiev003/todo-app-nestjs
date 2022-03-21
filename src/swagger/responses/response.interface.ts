import { ApiProperty } from '@nestjs/swagger';

export class CustomResponse<T> {
  @ApiProperty({ example: true, description: 'Success status of response' })
  status: boolean;

  @ApiProperty({ example: '', description: 'message' })
  message: string;

  @ApiProperty({ example: {}, description: 'message' })
  data: T;
}

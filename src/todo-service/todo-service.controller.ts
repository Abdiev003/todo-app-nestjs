import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TodoServiceService } from './todo-service.service';
import { CreateTodoServiceDto } from './dto/create-todo-service.dto';
import { UpdateTodoServiceDto } from './dto/update-todo-service.dto';
import { SingleTodoResponse } from 'src/swagger/responses/single-todo.response';
import { MultiTodoResponse } from 'src/swagger/responses/multi-todo.response';
import { CustomResponse } from 'src/swagger/responses/response.interface';

@ApiTags('todo-service')
@Controller('todo')
export class TodoServiceController {
  constructor(private readonly todoServiceService: TodoServiceService) {}

  @Post()
  @ApiOperation({ summary: 'Create todo' })
  @ApiResponse({
    status: 409,
    description: 'Todo creation failed',
    type: CustomResponse,
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: SingleTodoResponse,
  })
  async create(
    @Res() res: any,
    @Body() createTodoServiceDto: CreateTodoServiceDto,
  ) {
    const createdTodo = await this.todoServiceService.create(
      createTodoServiceDto,
    );

    if (createdTodo === 'unique') {
      return res.status(409).json({
        status: false,
        message: 'Todo already exists',
      });
    }

    return res.status(201).json({
      status: true,
      message: 'TodoService has been successfully created',
      data: createdTodo,
    });
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
    type: MultiTodoResponse,
  })
  async findAll(@Res() res: any) {
    const todos = await this.todoServiceService.findAll();

    if (todos === null) {
      return res.status(404).json({
        status: false,
        message: 'TodoServices not found',
      });
    }

    return res.status(200).json({
      status: true,
      message: 'TodoServices retrieved successfully',
      data: todos,
    });
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
    type: SingleTodoResponse,
  })
  async findOne(@Param('id') id: string, @Res() res: any) {
    const todo = await this.todoServiceService.findOne(id);

    if (todo === null) {
      return res.status(404).json({
        status: false,
        message: 'Todo not found',
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Todo retrieved successfully',
      data: todo,
    });
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: SingleTodoResponse,
  })
  async update(
    @Param('id') id: string,
    @Body() updateTodoServiceDto: UpdateTodoServiceDto,
    @Res() res: any,
  ) {
    const updatedTodo = await this.todoServiceService.update(
      id,
      updateTodoServiceDto,
    );

    return res.status(200).json({
      status: true,
      message: 'Todo updated successfully',
      data: updatedTodo,
    });
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
    type: SingleTodoResponse,
  })
  async remove(@Param('id') id: string, @Res() res: any) {
    const removedTodo = await this.todoServiceService.remove(id);

    if (removedTodo === null) {
      return res.status(404).json({
        status: false,
        message: 'Todo not found',
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Todo deleted successfully',
      data: removedTodo,
    });
  }
}

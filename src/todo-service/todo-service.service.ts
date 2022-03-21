import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateTodoServiceDto } from './dto/create-todo-service.dto';
import { UpdateTodoServiceDto } from './dto/update-todo-service.dto';
import { TodoService } from './entities/todo-service.entity';
import { TodoDocument } from 'src/schemas/todo.schema';

@Injectable()
export class TodoServiceService {
  constructor(
    @InjectModel(TodoService.name) private todoModel: Model<TodoDocument>,
  ) {}

  async create(createTodoServiceDto: CreateTodoServiceDto) {
    try {
      const createdTodo = new this.todoModel(createTodoServiceDto);
      return await createdTodo.save();
    } catch (error) {
      if (error.code === 11000) {
        return 'unique';
      }
    }
  }

  async findAll() {
    const todos = await this.todoModel.find().sort({ createdAt: -1 });

    if (!todos) {
      return null;
    }
    return todos;
  }

  async findOne(id: string) {
    const todo = await this.todoModel.findById(id);

    if (!todo) {
      return null;
    }
    return todo;
  }

  async update(id: string, updateTodoServiceDto: UpdateTodoServiceDto) {
    const todo = await this.todoModel.findById(id);

    if (!todo) {
      return null;
    }

    if (updateTodoServiceDto.title) {
      todo.title = updateTodoServiceDto.title;
    }
    if (updateTodoServiceDto.description) {
      todo.description = updateTodoServiceDto.description;
    }
    if (updateTodoServiceDto.completed) {
      todo.completed = updateTodoServiceDto.completed;
    }


    return await todo.save();
  }

  async remove(id: string) {
    const todo = await this.todoModel.findById(id);

    if (!todo) {
      return null;
    }
    return await todo.remove();
  }
}

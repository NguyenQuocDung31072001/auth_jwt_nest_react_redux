import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  get(@Param() params): Promise<Task> {
    return this.taskService.findOne(params.id);
  }

  @Post()
  create(@Body() task: Task) {
    return this.taskService.create(task);
  }

  @Put()
  update(@Body() task: Task) {
    return this.taskService.update(task);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.taskService.delete(params.id);
  }
}

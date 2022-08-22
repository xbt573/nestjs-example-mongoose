import { Controller, Param, Get, Post, Patch, Delete, Body } from '@nestjs/common';
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { TaskService } from './task.service';
import { Task } from './task.schema';
import { ParseObjectIdPipe } from '../shared/parse-objectid.pipe';
import { CreateTaskDto } from './create-task.dto';

@ApiTags('tasks')
@Controller('api/tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get(':id')
    @ApiOperation({ summary: 'Get specific task' })
    @ApiResponse({ status: 200, description: 'Task object' })
    @ApiResponse({ status: 400, description: 'Validation failed' })
    async getTask(@Param('id', ParseObjectIdPipe) id: string): Promise<Task> {
        return this.taskService.find(id);
    }

    @Get()
    @ApiOperation({ summary: 'Get all tasks' })
    @ApiResponse({ status: 200, description: 'Task list' })
    @ApiResponse({ status: 400, description: 'Validation failed' })
    async getTasks(): Promise<Task[]> {
        return this.taskService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Create task' })
    @ApiResponse({ status: 201, description: 'Task successfully created' })
    @ApiResponse({ status: 400, description: 'Validation failed' })
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.create(createTaskDto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update task' })
    @ApiResponse({ status: 200, description: 'Task successfully updated' })
    @ApiResponse({ status: 400, description: 'Validation failed' })
    async updateTask(@Body() createTaskDto: CreateTaskDto,
                     @Param('id', ParseObjectIdPipe) id: string): Promise<Task> {
        return this.taskService.update(createTaskDto, id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete task' })
    @ApiResponse({ status: 200, description: 'Task successfully deleted' })
    @ApiResponse({ status: 400, description: 'Validation failed' })
    async deleteTask(@Param('id', ParseObjectIdPipe) id: string): Promise<Task> {
        return this.taskService.delete(id);
    }
}

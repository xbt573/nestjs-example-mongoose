import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './task.schema';
import { CreateTaskDto } from './create-task.dto';

@Injectable()
export class TaskService {
    constructor(@InjectModel('task') private taskModel: Model<TaskDocument>) {}

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        const createdTask = new this.taskModel(createTaskDto);
        return createdTask.save();
    }

    async update(createTaskDto: CreateTaskDto, id: string): Promise<Task> {
        return this.taskModel.findByIdAndUpdate(id).exec();
    }

    async delete(id: string): Promise<Task> {
        return this.taskModel.findByIdAndDelete(id).exec();
    }

    async find(id: string): Promise<Task> {
        return this.taskModel.findById(id).exec();
    }

    async findAll(): Promise<Task[]> {
        return this.taskModel.find().exec();
    }
}

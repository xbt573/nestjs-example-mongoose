import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTaskDto {
    @ApiProperty({ example: 'Hello NestJS!', description: 'Task name' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'Buy cheese', description: 'Task description' })
    @IsString()
    description?: string;
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ versionKey: false })
export class Task {
    @Prop()
    title: string;

    @Prop({ required: false })
    description?: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class TodoService {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  completed: boolean;
}

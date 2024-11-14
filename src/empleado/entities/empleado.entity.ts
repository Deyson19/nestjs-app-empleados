import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';

@Schema()
export class Empleado {
  _id?: string;

  @Prop({ require: true })
  nombre: string;

  @Prop({ require: true })
  apellido: string;

  @Prop({ required: true, unique: true })
  correoElectronico: string;

  @Prop({ required: true })
  telefono: string;

  @Prop({ required: true })
  departamento: string;

  @Prop({ required: true })
  cargo: string;

  @Prop({ required: true })
  fechaIngreso: string;

  @Prop({ required: true })
  salario: number;

  @Prop({ default: true })
  activo: boolean;
}

export const EmpleadoSchema = SchemaFactory.createForClass(Empleado);

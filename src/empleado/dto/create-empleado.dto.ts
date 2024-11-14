import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
export class CreateEmpleadoDto {
  @IsString()
  nombre: string;
  @IsString()
  apellido: string;
  @IsString()
  correoElectronico: string;
  @IsString()
  telefono: string;
  @IsString()
  departamento: string;
  @IsString()
  cargo: string;
  @IsString()
  fechaIngreso: string;
  @IsNumber()
  salario: number;
  @IsBoolean()
  activo: boolean;
}

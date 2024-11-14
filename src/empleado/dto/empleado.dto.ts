export class EmpleadoDto {
  _id?: string;
  nombre: string;
  apellido: string;
  correoElectronico: string;
  telefono: string;
  departamento: string;
  cargo: string;
  fechaIngreso: Date | string;
  salario: number;
  activo: boolean;
}

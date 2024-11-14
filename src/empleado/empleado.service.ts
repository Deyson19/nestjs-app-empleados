import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Empleado } from './entities/empleado.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectModel(Empleado.name) private empleadoModel: Model<Empleado>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    try {
      if (createEmpleadoDto) {
        const empleado = new this.empleadoModel(createEmpleadoDto);
        await empleado.save();
        return empleado.toJSON();
      }
    } catch (error) {
      throw new BadRequestException('Error al crear el empleado');
    }
  }

  async findAll(): Promise<Empleado[]> {
    const empleados = await this.empleadoModel.find({ activo: true });
    return empleados;
  }

  async findOne(id: string) {
    try {
      const empleado = await this.GetEmpleado(id);
      if (!empleado) {
        return new NotFoundException('No se encontró el empleado');
      }
      return empleado;
    } catch (error) {
      throw new BadRequestException('Ocurrió un error al buscar el empleado');
    }
  }

  async update(id: string, updateEmpleadoDto: UpdateEmpleadoDto) {
    try {
      const empleado = await this.GetEmpleado(id);
      if (!empleado) {
        return new NotFoundException('No se encontró el empleado');
      }
      await this.empleadoModel.findByIdAndUpdate(
        empleado._id,
        updateEmpleadoDto,
      );
      return empleado;
    } catch (error) {
      throw new BadRequestException(
        'Ocurrió un error al actualizar el empleado',
      );
    }
  }

  async remove(id: string) {
    try {
      const empleado = await this.GetEmpleado(id);
      if (!empleado) {
        return new NotFoundException('No se encontró el empleado');
      }
      //return await this.empleadoModel.findByIdAndDelete(empleado._id).exec();
      empleado.activo = false;
      await this.empleadoModel.findByIdAndUpdate(empleado._id, empleado);
      return empleado;
    } catch (error) {
      throw new BadRequestException('Error al eliminar el empleado:', error);
    }
  }

  private async GetEmpleado(id: string): Promise<Empleado> {
    return await this.empleadoModel.findById(id);
  }
}

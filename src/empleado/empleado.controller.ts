import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';

@Controller('empleado')
export class EmpleadoController {
  constructor(private readonly empleadoService: EmpleadoService) {}
  private result: object;
  @Post()
  create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    return this.empleadoService.create(createEmpleadoDto);
  }
  @Post('addRange')
  createRange(@Body() empleados: CreateEmpleadoDto[]) {
    empleados.forEach((empleado) => {
      this.result = this.empleadoService.create(empleado);
    });
    return {
      isValid: this.result !== null,
      message: 'Empleados creados.',
    };
  }

  @Get()
  findAll() {
    return this.empleadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empleadoService.findOne(id);
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() updateEmpleadoDto: UpdateEmpleadoDto) {
    return this.empleadoService.update(id, updateEmpleadoDto);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() update: UpdateEmpleadoDto) {
    return this.empleadoService.update(id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empleadoService.remove(id);
  }
}

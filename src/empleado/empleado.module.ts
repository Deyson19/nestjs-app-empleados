import { Module } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { EmpleadoController } from './empleado.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Empleado, EmpleadoSchema } from './entities/empleado.entity';
@Module({
  controllers: [EmpleadoController],
  providers: [EmpleadoService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: Empleado.name,
        schema: EmpleadoSchema,
      },
    ]),
  ],
})
export class EmpleadoModule {}

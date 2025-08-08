import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Doctores')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @ApiOperation({ summary: 'Crear nuevo doctor' })
  @ApiResponse({
    status: 201,
    description: 'Doctor creado exitosamente',
    schema: {
      example: {
        id: 'cuid_example',
        email: 'doctor@ejemplo.com',
        firstName: 'Dr. Juan',
        lastName: 'Pérez',
        secondLastName: 'González',
        role: 'DOCTOR',
        isActive: true,
        createdAt: '2025-01-01T00:00:00.000Z',
      },
    },
  })
  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @ApiOperation({ summary: 'Obtener todos los doctores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de doctores obtenida exitosamente',
  })
  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @ApiOperation({ summary: 'Obtener estadísticas de doctores' })
  @ApiResponse({
    status: 200,
    description: 'Estadísticas de doctores',
    schema: {
      example: {
        totalDoctors: 25,
        activeDoctors: 23,
        inactiveDoctors: 2,
      },
    },
  })
  @Get('stats')
  getStats() {
    return this.doctorsService.getDoctorStats();
  }

  @ApiOperation({ summary: 'Buscar doctores por especialidad' })
  @ApiQuery({
    name: 'specialty',
    description: 'Especialidad médica',
    example: 'Endocrinología',
  })
  @ApiResponse({
    status: 200,
    description: 'Doctores filtrados por especialidad',
  })
  @Get('by-specialty')
  findBySpecialty(@Query('specialty') specialty: string) {
    return this.doctorsService.findBySpecialty(specialty);
  }

  @ApiOperation({ summary: 'Obtener doctor por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID único del doctor',
    example: 'cuid_example',
  })
  @ApiResponse({
    status: 200,
    description: 'Doctor encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Doctor no encontrado',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(id);
  }

  @ApiOperation({ summary: 'Obtener pacientes asignados a un doctor' })
  @ApiParam({
    name: 'id',
    description: 'ID único del doctor',
    example: 'cuid_example',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de pacientes del doctor',
  })
  @Get(':id/patients')
  getDoctorPatients(@Param('id') id: string) {
    return this.doctorsService.getDoctorPatients(id);
  }

  @ApiOperation({ summary: 'Actualizar doctor' })
  @ApiParam({
    name: 'id',
    description: 'ID único del doctor',
    example: 'cuid_example',
  })
  @ApiResponse({
    status: 200,
    description: 'Doctor actualizado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Doctor no encontrado',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(id, updateDoctorDto);
  }

  @ApiOperation({
    summary: 'Desactivar doctor',
    description: 'Realiza un soft delete desactivando al doctor',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único del doctor',
    example: 'cuid_example',
  })
  @ApiResponse({
    status: 200,
    description: 'Doctor desactivado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Doctor no encontrado',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(id);
  }
}

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
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Pacientes')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @ApiOperation({ summary: 'Crear nuevo paciente' })
  @ApiResponse({
    status: 201,
    description: 'Paciente creado exitosamente',
    schema: {
      example: {
        id: 'cuid_example',
        email: 'paciente@ejemplo.com',
        firstName: 'María',
        lastName: 'García',
        secondLastName: 'López',
        diabetesType: 'TYPE_2',
        diagnosisYear: 2020,
        hasHypertension: false,
        birthDate: '1990-03-20T00:00:00.000Z',
        gender: 'FEMALE',
        height: 165,
        weight: 70.5,
        isActive: true,
        createdAt: '2025-01-01T00:00:00.000Z',
      },
    },
  })
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @ApiOperation({ summary: 'Obtener todos los pacientes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pacientes obtenida exitosamente',
  })
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @ApiOperation({ summary: 'Obtener estadísticas de pacientes' })
  @ApiResponse({
    status: 200,
    description: 'Estadísticas de pacientes',
    schema: {
      example: {
        totalPatients: 150,
        diabetesTypeStats: [
          { diabetesType: 'TYPE_1', _count: { diabetesType: 45 } },
          { diabetesType: 'TYPE_2', _count: { diabetesType: 95 } },
          { diabetesType: 'GESTATIONAL', _count: { diabetesType: 8 } },
          { diabetesType: 'MODY', _count: { diabetesType: 2 } },
        ],
        hypertensionStats: [
          { hasHypertension: true, _count: { hasHypertension: 60 } },
          { hasHypertension: false, _count: { hasHypertension: 90 } },
        ],
      },
    },
  })
  @Get('stats')
  getStats() {
    return this.patientsService.getPatientStats();
  }

  @ApiOperation({ summary: 'Obtener paciente por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID único del paciente',
    example: 'cuid_example',
  })
  @ApiResponse({
    status: 200,
    description: 'Paciente encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Paciente no encontrado',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar paciente' })
  @ApiParam({
    name: 'id',
    description: 'ID único del paciente',
    example: 'cuid_example',
  })
  @ApiResponse({
    status: 200,
    description: 'Paciente actualizado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Paciente no encontrado',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @ApiOperation({
    summary: 'Desactivar paciente',
    description: 'Realiza un soft delete desactivando al paciente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único del paciente',
    example: 'cuid_example',
  })
  @ApiResponse({
    status: 200,
    description: 'Paciente desactivado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Paciente no encontrado',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
}

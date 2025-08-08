import {
  IsEnum,
  IsNumber,
  IsBoolean,
  IsDateString,
  Min,
  Max,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum DiabetesType {
  TYPE_1 = 'TYPE_1',
  TYPE_2 = 'TYPE_2',
  GESTATIONAL = 'GESTATIONAL',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export class CompleteProfileDto {
  // Información médica obligatoria
  @ApiProperty({
    description: 'Tipo de diabetes del paciente',
    example: 'TYPE_2',
    enum: DiabetesType,
  })
  @IsEnum(DiabetesType)
  diabetesType: DiabetesType;

  @ApiProperty({
    description: 'Año de diagnóstico de la diabetes',
    example: 2020,
    minimum: 1900,
    maximum: new Date().getFullYear(),
  })
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear())
  diagnosisYear: number;

  @ApiProperty({
    description: 'Indica si el paciente tiene hipertensión',
    example: false,
  })
  @IsBoolean()
  hasHypertension: boolean;

  // Información personal obligatoria
  @ApiProperty({
    description: 'Fecha de nacimiento del paciente',
    example: '1990-03-20',
    format: 'date',
  })
  @IsDateString()
  birthDate: string;

  @ApiProperty({
    description: 'Género del paciente',
    example: 'FEMALE',
    enum: Gender,
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: 'Altura del paciente en centímetros',
    example: 165,
    minimum: 50,
    maximum: 250,
  })
  @IsNumber()
  @Min(50) // altura mínima en cm
  @Max(250) // altura máxima en cm
  @Transform(({ value }) => parseFloat(value))
  height: number;

  @ApiProperty({
    description: 'Peso del paciente en kilogramos',
    example: 70.5,
    minimum: 20,
    maximum: 500,
  })
  @IsNumber()
  @Min(20) // peso mínimo en kg
  @Max(500) // peso máximo en kg
  @Transform(({ value }) => parseFloat(value))
  weight: number;

  // Información médica adicional (opcional)
  @ApiPropertyOptional({
    description: 'Historial médico adicional del paciente',
    example: 'Diabetes tipo 2 diagnosticada en 2020, sin complicaciones',
  })
  @IsOptional()
  @IsString()
  medicalHistory?: string;

  @ApiPropertyOptional({
    description: 'Medicamentos actuales que toma el paciente',
    example: 'Metformina 500mg dos veces al día',
  })
  @IsOptional()
  @IsString()
  currentMedications?: string;

  @ApiPropertyOptional({
    description: 'Alergias conocidas del paciente',
    example: 'Ninguna conocida',
  })
  @IsOptional()
  @IsString()
  allergies?: string;

  @ApiPropertyOptional({
    description: 'Contacto de emergencia del paciente',
    example: 'Carlos García (esposo)',
  })
  @IsOptional()
  @IsString()
  emergencyContact?: string;

  @ApiPropertyOptional({
    description: 'Teléfono de contacto de emergencia',
    example: '+34 987 654 321',
  })
  @IsOptional()
  @IsString()
  emergencyPhone?: string;
}

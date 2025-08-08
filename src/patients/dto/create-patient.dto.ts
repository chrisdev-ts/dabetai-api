import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  IsBoolean,
  IsDateString,
  IsNumber,
  Min,
  Max,
  MinLength,
} from 'class-validator';
import { DiabetesType, Gender } from '../../../generated/prisma';

export class CreatePatientDto {
  @ApiProperty({
    example: 'paciente@ejemplo.com',
    description: 'Email del paciente',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'contraseña123',
    description: 'Contraseña del paciente',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'María',
    description: 'Nombre del paciente',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'García',
    description: 'Primer apellido del paciente',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'López',
    description: 'Segundo apellido del paciente',
    required: false,
  })
  @IsString()
  @IsOptional()
  secondLastName?: string;

  @ApiProperty({
    example: 'TYPE_2',
    description: 'Tipo de diabetes',
    enum: DiabetesType,
  })
  @IsEnum(DiabetesType)
  diabetesType: DiabetesType;

  @ApiProperty({
    example: 2020,
    description: 'Año de diagnóstico de diabetes',
    minimum: 1900,
    maximum: 2025,
  })
  @IsInt()
  @Min(1900)
  @Max(2025)
  diagnosisYear: number;

  @ApiProperty({
    example: false,
    description: 'Si el paciente tiene hipertensión',
  })
  @IsBoolean()
  hasHypertension: boolean;

  @ApiProperty({
    example: '1990-03-20',
    description: 'Fecha de nacimiento (YYYY-MM-DD)',
  })
  @IsDateString()
  birthDate: string;

  @ApiProperty({
    example: 'FEMALE',
    description: 'Género del paciente',
    enum: Gender,
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    example: 165,
    description: 'Altura en centímetros',
    minimum: 50,
    maximum: 250,
  })
  @IsInt()
  @Min(50)
  @Max(250)
  height: number;

  @ApiProperty({
    example: 70.5,
    description: 'Peso en kilogramos',
    minimum: 10,
    maximum: 300,
  })
  @IsNumber()
  @Min(10)
  @Max(300)
  weight: number;
}

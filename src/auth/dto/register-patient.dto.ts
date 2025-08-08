import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsDateString,
  Min,
  Max,
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

export class RegisterPatientDto {
  // Información básica
  @ApiProperty({
    description: 'Correo electrónico del paciente',
    example: 'paciente@ejemplo.com',
    format: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Contraseña del paciente (mínimo 6 caracteres)',
    example: 'MiContraseña123!',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Primer nombre del paciente',
    example: 'Ana',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Apellido paterno del paciente',
    example: 'Martínez',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Apellido materno del paciente',
    example: 'Rivera',
  })
  @IsString()
  @IsNotEmpty()
  secondLastName: string;

  // Información médica
  @IsEnum(DiabetesType)
  @IsNotEmpty()
  diabetesType: DiabetesType;

  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear())
  diagnosisYear: number;

  @IsBoolean()
  @IsNotEmpty()
  hasHypertension: boolean;

  // Información personal
  @IsDateString()
  @IsNotEmpty()
  birthDate: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsNumber()
  @Min(50) // altura mínima en cm
  @Max(250) // altura máxima en cm
  @Transform(({ value }) => parseFloat(value))
  height: number;

  @IsNumber()
  @Min(20) // peso mínimo en kg
  @Max(500) // peso máximo en kg
  @Transform(({ value }) => parseFloat(value))
  weight: number;

  // Información médica adicional (opcional)
  @IsOptional()
  @IsString()
  medicalHistory?: string;

  @IsOptional()
  @IsString()
  currentMedications?: string;

  @IsOptional()
  @IsString()
  allergies?: string;

  @IsOptional()
  @IsString()
  emergencyContact?: string;

  @IsOptional()
  @IsString()
  emergencyPhone?: string;
}

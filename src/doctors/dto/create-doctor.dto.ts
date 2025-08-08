import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsOptional,
  IsArray,
  MinLength,
} from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({
    example: 'doctor@ejemplo.com',
    description: 'Email del doctor',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'contraseña123',
    description: 'Contraseña del doctor',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'Dr. Juan',
    description: 'Nombre del doctor',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Pérez',
    description: 'Primer apellido del doctor',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'González',
    description: 'Segundo apellido del doctor',
    required: false,
  })
  @IsString()
  @IsOptional()
  secondLastName?: string;

  @ApiProperty({
    example: 'CED12345',
    description: 'Número de cédula profesional',
  })
  @IsString()
  medicalLicense: string;

  @ApiProperty({
    example: 'Endocrinología',
    description: 'Especialidad médica principal',
  })
  @IsString()
  specialty: string;

  @ApiProperty({
    example: ['Diabetes', 'Metabolismo', 'Tiroides'],
    description: 'Áreas de especialización',
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  specializations?: string[];

  @ApiProperty({
    example: 'Hospital General',
    description: 'Institución donde trabaja',
    required: false,
  })
  @IsString()
  @IsOptional()
  institution?: string;

  @ApiProperty({
    example: '+52 555 123 4567',
    description: 'Número de teléfono',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    example: '15 años de experiencia en endocrinología',
    description: 'Biografía o descripción profesional',
    required: false,
  })
  @IsString()
  @IsOptional()
  bio?: string;
}

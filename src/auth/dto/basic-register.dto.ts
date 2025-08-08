import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BasicRegisterDto {
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'maria.garcia@ejemplo.com',
    format: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
    example: 'MiContraseña123!',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Primer nombre del usuario',
    example: 'María',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Apellido paterno del usuario',
    example: 'García',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Apellido materno del usuario',
    example: 'López',
  })
  @IsString()
  @IsNotEmpty()
  secondLastName: string;
}

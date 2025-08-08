import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
}

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  secondLastName?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

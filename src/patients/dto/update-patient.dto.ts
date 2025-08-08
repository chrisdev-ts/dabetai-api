import { PartialType } from '@nestjs/swagger';
import { CreatePatientDto } from './create-patient.dto';
import { IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @ApiProperty({
    example: true,
    description: 'Estado activo del paciente',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

// DTO específico para actualizar solo información médica
export class UpdateMedicalInfoDto {
  @ApiProperty({
    example: 'TYPE_2',
    description: 'Tipo de diabetes',
    required: false,
  })
  @IsOptional()
  diabetesType?: string;

  @ApiProperty({
    example: 2020,
    description: 'Año de diagnóstico',
    required: false,
  })
  @IsOptional()
  diagnosisYear?: number;

  @ApiProperty({
    example: false,
    description: 'Tiene hipertensión',
    required: false,
  })
  @IsOptional()
  hasHypertension?: boolean;

  @ApiProperty({
    example: 165,
    description: 'Altura en cm',
    required: false,
  })
  @IsOptional()
  height?: number;

  @ApiProperty({
    example: 70.5,
    description: 'Peso en kg',
    required: false,
  })
  @IsOptional()
  weight?: number;
}

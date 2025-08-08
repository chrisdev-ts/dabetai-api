import { PartialType } from '@nestjs/swagger';
import { CreateDoctorDto } from './create-doctor.dto';
import { IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
  @ApiProperty({
    example: true,
    description: 'Estado activo del doctor',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

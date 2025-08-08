import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import * as bcrypt from 'bcrypt';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async create(createPatientDto: CreatePatientDto) {
    // Hash password
    const hashedPassword = await bcrypt.hash(createPatientDto.password, 10);

    return this.prisma.user.create({
      data: {
        ...createPatientDto,
        password: hashedPassword,
        role: 'PATIENT',
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      where: { role: 'PATIENT' },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        secondLastName: true,
        diabetesType: true,
        diagnosisYear: true,
        hasHypertension: true,
        birthDate: true,
        gender: true,
        height: true,
        weight: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string) {
    const patient = await this.prisma.user.findFirst({
      where: { id, role: 'PATIENT' },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        secondLastName: true,
        diabetesType: true,
        diagnosisYear: true,
        hasHypertension: true,
        birthDate: true,
        gender: true,
        height: true,
        weight: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return patient;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    const patient = await this.findOne(id);

    // If password is being updated, hash it
    const updateData = { ...updatePatientDto };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        secondLastName: true,
        diabetesType: true,
        diagnosisYear: true,
        hasHypertension: true,
        birthDate: true,
        gender: true,
        height: true,
        weight: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: string) {
    const patient = await this.findOne(id);

    // Soft delete - just deactivate the user
    return this.prisma.user.update({
      where: { id },
      data: { isActive: false },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        secondLastName: true,
        isActive: true,
      },
    });
  }

  async getPatientStats() {
    const totalPatients = await this.prisma.user.count({
      where: { role: 'PATIENT', isActive: true },
    });

    const diabetesTypeStats = await this.prisma.user.groupBy({
      by: ['diabetesType'],
      where: { role: 'PATIENT', isActive: true },
      _count: {
        diabetesType: true,
      },
    });

    const hypertensionStats = await this.prisma.user.groupBy({
      by: ['hasHypertension'],
      where: { role: 'PATIENT', isActive: true },
      _count: {
        hasHypertension: true,
      },
    });

    return {
      totalPatients,
      diabetesTypeStats,
      hypertensionStats,
    };
  }
}

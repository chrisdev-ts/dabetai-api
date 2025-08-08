import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}

  async create(createDoctorDto: CreateDoctorDto) {
    // Hash password
    const hashedPassword = await bcrypt.hash(createDoctorDto.password, 10);

    return this.prisma.user.create({
      data: {
        ...createDoctorDto,
        password: hashedPassword,
        role: 'DOCTOR',
        // Store doctor-specific fields in a JSON field or separate table
        // For now, we'll use the existing user schema
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        secondLastName: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      where: { role: 'DOCTOR' },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        secondLastName: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string) {
    const doctor = await this.prisma.user.findFirst({
      where: { id, role: 'DOCTOR' },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        secondLastName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }

    return doctor;
  }

  async findBySpecialty(specialty: string) {
    return this.prisma.user.findMany({
      where: {
        role: 'DOCTOR',
        isActive: true,
        // Note: This would require adding specialty field to User model
        // For now, this is a placeholder
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        secondLastName: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    const doctor = await this.findOne(id);

    // If password is being updated, hash it
    if (updateDoctorDto.password) {
      updateDoctorDto.password = await bcrypt.hash(
        updateDoctorDto.password,
        10,
      );
    }

    return this.prisma.user.update({
      where: { id },
      data: updateDoctorDto,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        secondLastName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: string) {
    const doctor = await this.findOne(id);

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

  async getDoctorStats() {
    const totalDoctors = await this.prisma.user.count({
      where: { role: 'DOCTOR', isActive: true },
    });

    const activeDoctors = await this.prisma.user.count({
      where: { role: 'DOCTOR', isActive: true },
    });

    return {
      totalDoctors,
      activeDoctors,
      inactiveDoctors: totalDoctors - activeDoctors,
    };
  }

  async getDoctorPatients(doctorId: string) {
    // This would require a relationship table between doctors and patients
    // For now, return all patients as a placeholder
    return this.prisma.user.findMany({
      where: { role: 'PATIENT', isActive: true },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        secondLastName: true,
        email: true,
        diabetesType: true,
        diagnosisYear: true,
      },
    });
  }
}

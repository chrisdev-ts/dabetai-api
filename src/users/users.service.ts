import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { User, Prisma } from '../../generated/prisma';
import {
  UserResponse,
  BasicUserResponse,
} from './interfaces/user-response.interface';
import { RegisterPatientDto } from '../auth/dto/register-patient.dto';
import { BasicRegisterDto } from '../auth/dto/basic-register.dto';
import { CompleteProfileDto } from '../auth/dto/complete-profile.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async createPatient(
    registerPatientDto: RegisterPatientDto & { role: any },
  ): Promise<UserResponse> {
    const hashedPassword = await bcrypt.hash(registerPatientDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: registerPatientDto.email,
        password: hashedPassword,
        firstName: registerPatientDto.firstName,
        lastName: registerPatientDto.lastName,
        role: registerPatientDto.role,
        diabetesType: registerPatientDto.diabetesType,
        diagnosisYear: registerPatientDto.diagnosisYear,
        hasHypertension: registerPatientDto.hasHypertension,
        birthDate: new Date(registerPatientDto.birthDate),
        gender: registerPatientDto.gender,
        height: registerPatientDto.height,
        weight: registerPatientDto.weight,
        medicalHistory: registerPatientDto.medicalHistory,
        currentMedications: registerPatientDto.currentMedications,
        allergies: registerPatientDto.allergies,
        emergencyContact: registerPatientDto.emergencyContact,
        emergencyPhone: registerPatientDto.emergencyPhone,
      },
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findAll(): Promise<BasicUserResponse[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string): Promise<BasicUserResponse | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findFullProfile(id: string): Promise<UserResponse | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    const data: Prisma.UserUpdateInput = { ...updateUserDto };

    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data,
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async remove(id: string): Promise<UserResponse> {
    const user = await this.prisma.user.delete({
      where: { id },
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async validatePassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async createBasicUser(
    basicRegisterDto: BasicRegisterDto & { role: any },
  ): Promise<UserResponse> {
    const hashedPassword = await bcrypt.hash(basicRegisterDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: basicRegisterDto.email,
        password: hashedPassword,
        firstName: basicRegisterDto.firstName,
        lastName: basicRegisterDto.lastName,
        secondLastName: basicRegisterDto.secondLastName,
        role: basicRegisterDto.role,
      },
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async completeUserProfile(
    userId: string,
    completeProfileDto: CompleteProfileDto,
  ): Promise<UserResponse> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        diabetesType: completeProfileDto.diabetesType,
        diagnosisYear: completeProfileDto.diagnosisYear,
        hasHypertension: completeProfileDto.hasHypertension,
        birthDate: new Date(completeProfileDto.birthDate),
        gender: completeProfileDto.gender,
        height: completeProfileDto.height,
        weight: completeProfileDto.weight,
        medicalHistory: completeProfileDto.medicalHistory,
        currentMedications: completeProfileDto.currentMedications,
        allergies: completeProfileDto.allergies,
        emergencyContact: completeProfileDto.emergencyContact,
        emergencyPhone: completeProfileDto.emergencyPhone,
      },
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
